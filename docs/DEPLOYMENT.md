# VasuPrint — Deployment Runbook (Hostinger VPS)

Target: Ubuntu 24.04 LTS on the existing Hostinger VPS. One Next.js process under PM2 behind Nginx with Let's Encrypt. Deploys from GitHub Actions over SSH.

Environments:

| Env | Host | Branch | Notes |
|---|---|---|---|
| Production | `vasuprint.com` (www → apex) | `main` | Indexable |
| Staging (optional) | `staging.vasuprint.com` | `staging` | HTTP basic auth + `X-Robots-Tag: noindex`; separate PM2 app on port 3001, separate `.env` and database name `vasuprint_staging` |

---

## 1. Server layout

```
/srv/vasuprint/
├── releases/
│   ├── 20261115-101500-ab12cd3/     # one directory per deploy (standalone build)
│   └── …                            # keep last 5
├── current -> releases/20261115-101500-ab12cd3
├── shared/
│   ├── .env                         # production env (600)
│   ├── uploads/                     # artwork (700) — tmp/ and leads/
│   └── logs/
└── repo/                            # bare clone used to build releases
/var/backups/vasuprint/              # local backup staging
```

## 2. One-time server setup

Run as root once, then use `deploy` for everything else.

### 2.1 Base system
```bash
apt update && apt -y upgrade
apt -y install nginx git curl ufw fail2ban unattended-upgrades rclone build-essential
dpkg-reconfigure -plow unattended-upgrades       # enable security updates
timedatectl set-timezone Asia/Kolkata
```

### 2.2 Deploy user and SSH
```bash
adduser --disabled-password --gecos "" deploy
usermod -aG sudo deploy        # optional; remove after setup if not needed
mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh
# paste your personal public key AND the GitHub Actions deploy public key:
nano /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```
`/etc/ssh/sshd_config`: `PermitRootLogin no`, `PasswordAuthentication no`, `KbdInteractiveAuthentication no` → `systemctl restart ssh`. **Test a new SSH session as `deploy` before closing the root session.**

### 2.3 Firewall and fail2ban
```bash
ufw default deny incoming && ufw default allow outgoing
ufw allow OpenSSH && ufw allow 'Nginx Full'
ufw enable
systemctl enable --now fail2ban      # default sshd jail
```

### 2.4 Node.js, pnpm, PM2 (as `deploy`)
```bash
curl -fsSL https://fnm.vercel.app/install | bash && source ~/.bashrc
fnm install 22 && fnm default 22
corepack enable && corepack prepare pnpm@10 --activate
npm i -g pm2
pm2 install pm2-logrotate && pm2 set pm2-logrotate:retain 14
pm2 startup systemd -u deploy --hp /home/deploy   # run the printed sudo command
```

### 2.5 Directories
```bash
sudo mkdir -p /srv/vasuprint/{releases,shared/uploads/tmp,shared/uploads/leads,shared/logs} /var/backups/vasuprint
sudo chown -R deploy:deploy /srv/vasuprint /var/backups/vasuprint
chmod 700 /srv/vasuprint/shared/uploads
git clone --bare git@github.com:nishant-kumar-yadav/vasu-prints.git /srv/vasuprint/repo   # needs a read-only deploy key on GitHub
```
Create `/srv/vasuprint/shared/.env` from `.env.example` (see `ARCHITECTURE.md` §9.2), `chmod 600`.

### 2.6 DNS
At the domain registrar: `A vasuprint.com → <VPS IPv4>`, `A www → <VPS IPv4>` (AAAA if the VPS has IPv6). Add `TXT` for Search Console verification. For email deliverability, add the SPF/DKIM/DMARC records your SMTP provider gives you (Gmail/Workspace or Hostinger mail).

### 2.7 MongoDB Atlas
1. Create project "VasuPrint", cluster **M0**, provider AWS, region **Mumbai (ap-south-1)**.
2. Database user `vasuprint_app` with role `readWrite@vasuprint`; strong generated password.
3. Network access: add the VPS public IP only (and your own IP temporarily for local seeding; remove afterwards).
4. Put the SRV connection string in `.env` as `MONGODB_URI` (database `vasuprint`).

## 3. Nginx

`/etc/nginx/sites-available/vasuprint.conf`:

```nginx
# Redirect HTTP → HTTPS and www → apex
server {
    listen 80;
    listen [::]:80;
    server_name vasuprint.com www.vasuprint.com;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 301 https://vasuprint.com$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name www.vasuprint.com;
    ssl_certificate     /etc/letsencrypt/live/vasuprint.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vasuprint.com/privkey.pem;
    return 301 https://vasuprint.com$request_uri;
}

limit_req_zone $binary_remote_addr zone=pages:10m rate=20r/s;

upstream vasuprint_app { server 127.0.0.1:3000; keepalive 32; }

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name vasuprint.com;

    ssl_certificate     /etc/letsencrypt/live/vasuprint.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vasuprint.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;

    server_tokens off;
    client_max_body_size 1m;           # default for everything
    gzip on; gzip_types text/css application/javascript application/json image/svg+xml text/plain;

    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;   # single trusted hop
    proxy_set_header X-Forwarded-Proto $scheme;

    # Immutable build assets
    location /_next/static/ {
        alias /srv/vasuprint/current/.next/static/;
        expires 1y; add_header Cache-Control "public, max-age=31536000, immutable"; access_log off;
    }
    location /images/ {
        alias /srv/vasuprint/current/public/images/;
        expires 30d; add_header Cache-Control "public, max-age=2592000"; access_log off;
    }

    # Artwork uploads: large bodies, streamed, long timeouts
    location = /api/uploads {
        client_max_body_size 101m;
        proxy_request_buffering off;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;
        client_body_timeout 600s;
        proxy_pass http://vasuprint_app;
    }

    # Admin product images
    location = /api/admin/media {
        client_max_body_size 9m;
        proxy_pass http://vasuprint_app;
    }

    location / {
        limit_req zone=pages burst=40 nodelay;
        proxy_pass http://vasuprint_app;
    }
}

# Reject unknown hosts
server { listen 443 ssl default_server; ssl_reject_handshake on; }
server { listen 80 default_server; return 444; }
```

```bash
sudo ln -s /etc/nginx/sites-available/vasuprint.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
# First issue the certificate (temporarily comment out the 443 blocks, or use --nginx):
sudo apt -y install certbot python3-certbot-nginx
sudo certbot certonly --webroot -w /var/www/html -d vasuprint.com -d www.vasuprint.com --agree-tos -m <owner email> --no-eff-email
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl list-timers | grep certbot    # auto-renew timer present
```
Add `/etc/letsencrypt/renewal-hooks/deploy/reload-nginx.sh` containing `systemctl reload nginx` (chmod +x).

## 4. PM2

`ecosystem.config.cjs` (in the repo):
```js
module.exports = {
  apps: [{
    name: 'vasuprint',
    cwd: '/srv/vasuprint/current',
    script: 'server.js',                 // Next.js standalone output
    node_args: '--env-file=/srv/vasuprint/shared/.env',
    env: { NODE_ENV: 'production', PORT: 3000, HOSTNAME: '127.0.0.1' },
    exec_mode: 'fork',                   // single instance (in-memory rate limits)
    instances: 1,
    max_memory_restart: '700M',
    kill_timeout: 10000,
    listen_timeout: 10000,
    out_file: '/srv/vasuprint/shared/logs/out.log',
    error_file: '/srv/vasuprint/shared/logs/error.log',
    time: true,
  }],
};
```

## 5. Deploy

### 5.1 `scripts/deploy.sh` (runs on the VPS as `deploy`)
```bash
#!/usr/bin/env bash
set -euo pipefail
SHA="${1:?commit sha required}"
ROOT=/srv/vasuprint
STAMP="$(date +%Y%m%d-%H%M%S)-${SHA:0:7}"
BUILD="$ROOT/releases/$STAMP"

git --git-dir="$ROOT/repo" fetch origin main --prune
mkdir -p "$BUILD/src"
git --git-dir="$ROOT/repo" --work-tree="$BUILD/src" checkout -f "$SHA"

cd "$BUILD/src"
pnpm install --frozen-lockfile
set -a; source "$ROOT/shared/.env"; set +a
GIT_SHA="$SHA" pnpm build                       # runs check:placeholders in production
# Assemble standalone release
cp -r .next/standalone/. "$BUILD/"
mkdir -p "$BUILD/.next" && cp -r .next/static "$BUILD/.next/static"
cp -r public "$BUILD/public"
cp ecosystem.config.cjs "$BUILD/"
pnpm build:scripts                               # compiles scripts/*.ts → dist/scripts/*.js
mkdir -p "$BUILD/scripts"
cp dist/scripts/*.js scripts/*.sh "$BUILD/scripts/" && chmod +x "$BUILD/scripts/"*.sh
rm -rf "$BUILD/src"

ln -sfn "$BUILD" "$ROOT/current"
pm2 startOrReload "$ROOT/current/ecosystem.config.cjs" --update-env
pm2 save

# Health check (rollback on failure)
for i in {1..20}; do
  if curl -fsS http://127.0.0.1:3000/api/health >/dev/null; then echo "Deployed $STAMP"; break; fi
  sleep 2
  if [ "$i" = 20 ]; then
    PREV="$(ls -1dt $ROOT/releases/*/ | sed -n 2p)"
    echo "Health check failed — rolling back to $PREV"; ln -sfn "$PREV" "$ROOT/current"
    pm2 reload vasuprint --update-env; exit 1
  fi
done

ls -1dt $ROOT/releases/*/ | tail -n +6 | xargs -r rm -rf    # keep 5
```
Building on the VPS needs ~1.5 GB RAM; if the VPS has ≤ 2 GB, add a 2 GB swap file (`fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile`, add to `/etc/fstab`).

### 5.2 GitHub Actions — `.github/workflows/deploy.yml`
```yaml
name: Deploy
on:
  push: { branches: [main] }
  workflow_dispatch:
concurrency: { group: deploy-production, cancel-in-progress: false }
jobs:
  ci:
    uses: ./.github/workflows/ci.yml
  deploy:
    needs: ci
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: deploy
          key: ${{ secrets.VPS_SSH_KEY }}
          port: ${{ secrets.VPS_PORT || 22 }}
          script: bash /srv/vasuprint/repo-scripts/deploy.sh ${{ github.sha }}
```
Keep a copy of `deploy.sh` at `/srv/vasuprint/repo-scripts/deploy.sh` (updated manually when the script changes) so a broken release can't break the deployer. GitHub secrets: `VPS_HOST`, `VPS_SSH_KEY` (private key whose public half is in `authorized_keys`), optional `VPS_PORT`. Use a GitHub **environment** "production" with required reviewer if you want manual approval.

### 5.3 CI — `.github/workflows/ci.yml` (reusable, also runs on PRs)
Steps: checkout → setup pnpm 10 + Node 22 with cache → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm test` (Vitest, mongodb-memory-server) → `pnpm build` with `ALLOW_PLACEHOLDERS=true` and test env → `pnpm exec playwright install --with-deps chromium webkit` → `pnpm test:e2e` (against `pnpm start`) → Lighthouse CI on `/`, `/mono-carton-boxes`, `/custom-stickers` → upload Playwright report on failure. Also `pnpm audit --prod --audit-level=high`.

### 5.4 Rollback
```bash
ls -1dt /srv/vasuprint/releases/*/          # pick previous
ln -sfn /srv/vasuprint/releases/<previous> /srv/vasuprint/current
pm2 reload vasuprint --update-env
```

## 6. Scheduled jobs (`crontab -e` as `deploy`)

```cron
# Orphaned pending uploads (>24h)
15 * * * *  cd /srv/vasuprint/current && node --env-file=/srv/vasuprint/shared/.env scripts/cleanup-uploads.js >> /srv/vasuprint/shared/logs/cron.log 2>&1
# Nightly backup at 02:30 IST
30 2 * * *  /srv/vasuprint/current/scripts/backup.sh >> /srv/vasuprint/shared/logs/backup.log 2>&1
# Disk usage alert (email via SMTP helper or healthchecks ping)
0 */6 * * * df -P /srv | awk 'NR==2 {gsub("%","",$5); if ($5 > 70) exit 1}' || curl -fsS -m 10 "$DISK_ALERT_URL" >/dev/null
```
(`deploy.sh` compiles `scripts/*.ts` to `.js` with `pnpm build:scripts` and copies them, plus the `.sh` scripts, into `<release>/scripts/`. The cleanup script needs `mongoose` at runtime, which is already present in the standalone `node_modules`; if tracing drops it, add it to `outputFileTracingIncludes`.)

## 7. Backups

`scripts/backup.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail
set -a; source /srv/vasuprint/shared/.env; set +a
STAMP=$(date +%Y%m%d)
OUT=/var/backups/vasuprint
mongodump --uri="$MONGODB_URI" --archive="$OUT/db-$STAMP.archive.gz" --gzip
rclone copy "$OUT/db-$STAMP.archive.gz" "vasuprint-crypt:db/"                 # encrypted remote
rclone sync /srv/vasuprint/shared/uploads/leads "vasuprint-crypt:uploads/leads" --transfers 4
find "$OUT" -name 'db-*.archive.gz' -mtime +7 -delete                         # 7 days local
rclone delete "vasuprint-crypt:db/" --min-age 90d                             # 90 days remote
curl -fsS -m 10 "${BACKUP_HEARTBEAT_URL:-}" >/dev/null || true                # healthchecks.io ping
```
- Install `mongodb-database-tools` (`mongodump`) from MongoDB's apt repo.
- rclone: configure a base remote (Cloudflare R2 free tier 10 GB, or Google Drive) and a `crypt` remote `vasuprint-crypt` on top of it. Store the crypt passwords in the owner's password manager.
- Uploads use `sync` (never deletes remote copies of retained files because leads are kept indefinitely; deleted leads are removed remotely too — intended for DPDP erasure requests).
- **Restore drill** (do once before launch, then quarterly): `rclone copy vasuprint-crypt:db/db-<date>.archive.gz .` → `mongorestore --uri=<staging uri> --archive=db-<date>.archive.gz --gzip --nsFrom='vasuprint.*' --nsTo='vasuprint_restore.*'` → spot-check counts.
- Hostinger VPS snapshots weekly as an additional layer.

## 8. Monitoring

| What | Tool | Setting |
|---|---|---|
| Uptime | UptimeRobot (free) or Better Stack | `GET https://vasuprint.com/api/health` every 5 min; alert to owner email/WhatsApp |
| Backups ran | healthchecks.io (free) | Cron heartbeat daily, alert if missed |
| Disk | cron above → healthchecks.io "fail" URL | alert at 70 % |
| TLS expiry | UptimeRobot SSL monitor | alert 14 days before |
| Errors | `pm2 logs vasuprint --err`, weekly review | — |

## 9. Go-live checklist

- [ ] `.env` complete; `ALLOW_PLACEHOLDERS` unset; build passes `check:placeholders`.
- [ ] `QUOTE_BACKEND=on`; real Turnstile keys for `vasuprint.com`; test submission received in `QUOTE_NOTIFY_TO` inbox and acknowledgement received.
- [ ] SPF/DKIM/DMARC pass (check with mail-tester.com ≥ 9/10).
- [ ] Admin login works; `SESSION_SECRET` and `ADMIN_PASSWORD_HASH` are production values.
- [ ] `https://www.vasuprint.com` and `http://` redirect to `https://vasuprint.com`.
- [ ] `curl -I` shows HSTS, CSP, nosniff headers.
- [ ] 101 MB upload rejected with 413; 99 MB upload succeeds on a throttled connection.
- [ ] Backup ran and restore drill completed.
- [ ] Uptime, backup and disk monitors active.
- [ ] Search Console verified; sitemap submitted; GA4 receiving `generate_lead` in DebugView.
- [ ] Atlas network access contains only the VPS IP.
- [ ] `nmap <VPS IP>` from outside shows only 22, 80, 443.
