import { describe, it, expect } from 'vitest';
import { parseEnv } from '@/config/env';

describe('Environment Configuration (env.ts)', () => {
  const minimalValidEnv = {
    SITE_URL: 'https://vasuprint.com',
    CATALOG_SOURCE: 'static' as const,
    QUOTE_BACKEND: 'off' as const,
  };

  it('parses minimal valid environment configuration', () => {
    const parsed = parseEnv(minimalValidEnv);
    expect(parsed.SITE_URL).toBe('https://vasuprint.com');
    expect(parsed.CATALOG_SOURCE).toBe('static');
    expect(parsed.QUOTE_BACKEND).toBe('off');
    expect(parsed.LOG_LEVEL).toBe('info');
    expect(parsed.SESSION_VERSION).toBe(1);
  });

  it('throws when SITE_URL is missing', () => {
    expect(() =>
      parseEnv({
        CATALOG_SOURCE: 'static',
        QUOTE_BACKEND: 'off',
      }),
    ).toThrow(/SITE_URL/);
  });

  it('throws when SITE_URL is not a valid URL', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        SITE_URL: 'invalid-url',
      }),
    ).toThrow(/SITE_URL must be a valid URL/);
  });

  it('throws when CATALOG_SOURCE is invalid', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        CATALOG_SOURCE: 'invalid' as unknown as 'static',
      }),
    ).toThrow(/CATALOG_SOURCE/);
  });

  it('throws when CATALOG_SOURCE is mongo and MONGODB_URI is missing', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        CATALOG_SOURCE: 'mongo',
      }),
    ).toThrow(/MONGODB_URI is required/);
  });

  it('throws when QUOTE_BACKEND is on and required quote secrets are missing', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        QUOTE_BACKEND: 'on',
      }),
    ).toThrow(/UPLOAD_DIR is required/);
  });

  it('succeeds when QUOTE_BACKEND is on and all required secrets are provided', () => {
    const fullQuoteEnv = {
      ...minimalValidEnv,
      QUOTE_BACKEND: 'on' as const,
      MONGODB_URI: 'mongodb://localhost:27017/vasuprint',
      UPLOAD_DIR: '/tmp/uploads',
      SMTP_HOST: 'smtp.gmail.com',
      SMTP_PORT: '465',
      SMTP_USER: 'test@vasuprint.com',
      SMTP_PASS: 'secret',
      MAIL_FROM: 'quotes@vasuprint.com',
      QUOTE_NOTIFY_TO: 'admin@vasuprint.com',
      TURNSTILE_SECRET_KEY: '1x0000000000000000000000000000000AA',
      TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
      IP_HASH_SALT: '0123456789abcdef0123456789abcdef',
    };

    const parsed = parseEnv(fullQuoteEnv);
    expect(parsed.QUOTE_BACKEND).toBe('on');
    expect(parsed.UPLOAD_DIR).toBe('/tmp/uploads');
    expect(parsed.MONGODB_URI).toBe('mongodb://localhost:27017/vasuprint');
  });

  it('throws when ADMIN_EMAIL is set but ADMIN_PASSWORD_HASH or SESSION_SECRET is missing', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        ADMIN_EMAIL: 'admin@vasuprint.com',
      }),
    ).toThrow(/ADMIN_PASSWORD_HASH is required/);
  });

  it('throws when SESSION_SECRET is less than 32 characters', () => {
    expect(() =>
      parseEnv({
        ...minimalValidEnv,
        ADMIN_EMAIL: 'admin@vasuprint.com',
        ADMIN_PASSWORD_HASH: '$argon2id$...',
        SESSION_SECRET: 'short-secret',
      }),
    ).toThrow();
  });
});
