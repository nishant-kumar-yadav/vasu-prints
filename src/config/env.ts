import 'server-only';
import { z } from 'zod';

export const envSchema = z
  .object({
    SITE_URL: z.string().url('SITE_URL must be a valid URL'),
    CATALOG_SOURCE: z.enum(['static', 'mongo']),
    QUOTE_BACKEND: z.enum(['off', 'on']),
    ALLOW_PLACEHOLDERS: z.enum(['true', 'false']).optional(),
    LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

    // MongoDB
    MONGODB_URI: z.string().optional(),

    // Storage & Uploads
    UPLOAD_DIR: z.string().optional(),

    // SMTP
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    MAIL_FROM: z.string().optional(),
    QUOTE_NOTIFY_TO: z.string().optional(),

    // Turnstile
    TURNSTILE_SECRET_KEY: z.string().optional(),
    TURNSTILE_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),

    // Security
    IP_HASH_SALT: z.string().optional(),

    // Admin & Auth (P3)
    ADMIN_EMAIL: z.string().email().optional(),
    SESSION_VERSION: z.coerce.number().int().positive().default(1),
    ADMIN_PASSWORD_HASH: z.string().optional(),
    SESSION_SECRET: z.string().min(32).optional(),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),

    // Observability & SEO (P4)
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    GOOGLE_SITE_VERIFICATION: z.string().optional(),
    BACKUP_HEARTBEAT_URL: z.string().optional(),
    DISK_ALERT_URL: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isMongoRequired = data.CATALOG_SOURCE === 'mongo' || data.QUOTE_BACKEND === 'on';
    if (isMongoRequired && !data.MONGODB_URI) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['MONGODB_URI'],
        message: 'MONGODB_URI is required when CATALOG_SOURCE=mongo or QUOTE_BACKEND=on',
      });
    }

    if (data.QUOTE_BACKEND === 'on') {
      const quoteFields: Array<keyof typeof data> = [
        'UPLOAD_DIR',
        'SMTP_HOST',
        'SMTP_PORT',
        'SMTP_USER',
        'SMTP_PASS',
        'MAIL_FROM',
        'QUOTE_NOTIFY_TO',
        'TURNSTILE_SECRET_KEY',
        'IP_HASH_SALT',
      ];

      for (const field of quoteFields) {
        if (!data[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `${field} is required when QUOTE_BACKEND=on`,
          });
        }
      }

      if (!data.TURNSTILE_SITE_KEY && !data.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['TURNSTILE_SITE_KEY'],
          message:
            'TURNSTILE_SITE_KEY (or NEXT_PUBLIC_TURNSTILE_SITE_KEY) is required when QUOTE_BACKEND=on',
        });
      }
    }

    if (data.ADMIN_EMAIL) {
      const adminFields: Array<keyof typeof data> = ['ADMIN_PASSWORD_HASH', 'SESSION_SECRET'];
      for (const field of adminFields) {
        if (!data[field]) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `${field} is required when ADMIN_EMAIL is configured`,
          });
        }
      }
    }
  });

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const errorDetails = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    throw new Error(`\n❌ Invalid environment variables:\n${errorDetails}\n`);
  }
  return result.data;
}

let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = parseEnv(process.env);
  }
  return cachedEnv;
}

export const env = new Proxy({} as Env, {
  get(_target, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
