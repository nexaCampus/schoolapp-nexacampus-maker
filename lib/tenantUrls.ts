/**
 * Canonical tenant URL builder.
 *
 * Every tenant is addressed by its own subdomain of the deployed webapp:
 *   student -> https://<slug>.<APP_HOST>          (e.g. https://greenwood.school-webapp-self.vercel.app)
 *   admin   -> https://<slug>.admin.<APP_HOST>    (e.g. https://greenwood.admin.school-webapp-self.vercel.app)
 *
 * The legacy path form (https://<APP_HOST>/school/<slug>) is kept only as a
 * last-resort fallback for deployments without wildcard DNS.
 */

export const CANONICAL_APP_HOST = (
  process.env.NEXT_PUBLIC_CANONICAL_APP_HOST || 'nexacampus.school'
)
  .toLowerCase()
  .trim();

export const PRODUCTION_BASE_DOMAIN = 'nexacampus.school';

/**
 * Parent domain for cookies that must be shared between the platform host and
 * the tenant subdomains (the signed session cookie and the tenant slug cookie).
 * A cookie set on `school-webapp-self.vercel.app` is also sent to
 * `greenwood.school-webapp-self.vercel.app`, which is what keeps a signed-in
 * visitor signed in after the canonical subdomain redirect.
 * Undefined on localhost, where the browser scopes cookies to the host.
 */
export const SHARED_COOKIE_DOMAIN: string | undefined = (() => {
  const host = CANONICAL_APP_HOST;
  if (!host || host === 'localhost' || host.endsWith('.localhost')) return undefined;
  if (!host.includes('.')) return undefined;
  return `.${host}`;
})();

export interface TenantPortalUrls {
  /** Canonical student portal — subdomain of the deployed webapp. */
  appDomain: string;
  /** Canonical admin portal — subdomain of the deployed webapp. */
  appAdminDomain: string;
  /** Production custom domain (DNS-bound). */
  customDomain: string;
  /** Production admin custom domain (DNS-bound). */
  customAdminDomain: string;
  /** Last-resort path fallback (no wildcard DNS required). */
  pathFallback: string;
  /** Last-resort admin path fallback. */
  pathFallbackAdmin: string;
}

/**
 * Strict slug validation regex: lowercase alphanumeric, hyphens allowed only internally.
 * Maximum 63 characters (RFC 1035 label limit).
 */
export const SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/**
 * Validates and sanitizes a tenant slug. Returns an empty string if invalid or untrusted.
 */
export function sanitizeSlug(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const cleaned = raw.trim().toLowerCase();
  return SLUG_REGEX.test(cleaned) ? cleaned : '';
}

/**
 * Sanitizes a telephone string into a safe tel: href.
 * Strips all characters except digits and the leading + prefix.
 */
export function sanitizeTelHref(phone: unknown): string {
  if (typeof phone !== 'string') return '#';
  const digitsAndPlus = phone.replace(/[^\d+]/g, '');
  return digitsAndPlus ? `tel:${digitsAndPlus}` : '#';
}

/**
 * Sanitizes an email address into a safe mailto: href.
 */
export function sanitizeMailtoHref(email: unknown): string {
  if (typeof email !== 'string') return '#';
  const trimmed = email.trim();
  if (!trimmed || !/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(trimmed)) {
    return '#';
  }
  return `mailto:${encodeURIComponent(trimmed).replace(/%40/g, '@')}`;
}

export function tenantPortalUrls(slug: string): TenantPortalUrls {
  const clean = sanitizeSlug(slug);
  if (!clean) {
    return {
      appDomain: '/',
      appAdminDomain: '/admin',
      customDomain: '/',
      customAdminDomain: '/admin',
      pathFallback: '/',
      pathFallbackAdmin: '/admin',
    };
  }

  const encodedSlug = encodeURIComponent(clean);
  return {
    appDomain: `https://${encodedSlug}.${CANONICAL_APP_HOST}`,
    appAdminDomain: `https://${encodedSlug}.admin.${CANONICAL_APP_HOST}`,
    customDomain: `https://${encodedSlug}.${PRODUCTION_BASE_DOMAIN}`,
    customAdminDomain: `https://${encodedSlug}.admin.${PRODUCTION_BASE_DOMAIN}`,
    pathFallback: `https://${CANONICAL_APP_HOST}/school/${encodedSlug}`,
    pathFallbackAdmin: `https://${CANONICAL_APP_HOST}/school/${encodedSlug}/admin`,
  };
}
