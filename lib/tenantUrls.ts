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
  process.env.NEXT_PUBLIC_CANONICAL_APP_HOST || 'school-webapp-self.vercel.app'
)
  .toLowerCase()
  .trim();

export const PRODUCTION_BASE_DOMAIN = 'nexacampus.school';

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

export function tenantPortalUrls(slug: string): TenantPortalUrls {
  const clean = (slug || '').trim().toLowerCase();
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

  return {
    appDomain: `https://${clean}.${CANONICAL_APP_HOST}`,
    appAdminDomain: `https://${clean}.admin.${CANONICAL_APP_HOST}`,
    customDomain: `https://${clean}.${PRODUCTION_BASE_DOMAIN}`,
    customAdminDomain: `https://${clean}.admin.${PRODUCTION_BASE_DOMAIN}`,
    pathFallback: `https://${CANONICAL_APP_HOST}/school/${clean}`,
    pathFallbackAdmin: `https://${CANONICAL_APP_HOST}/school/${clean}/admin`,
  };
}
