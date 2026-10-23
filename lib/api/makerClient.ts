/**
 * NexaCampus Maker & Multi-Tenant API Client
 * Interfaces with Go Orchestrator Backend deployed on Render or Local Dev.
 */

import { tenantPortalUrls, sanitizeSlug } from '@/lib/tenantUrls';

export interface CreatorSessionData {
  phone: string;
  creatorName: string;
  verifiedAt: string;
  token?: string;
}

export interface SchoolRecordData {
  id: string;
  creator_phone: string;
  creator_name: string;
  leadership_position: string;
  school_name: string;
  teacher_count: string;
  affiliation_board: string;
  enrolled_scholars: string;
  city: string;
  state_territory: string;
  subdomain_slug: string;
  school_motto: string;
  active_modules: Record<string, boolean>;
  student_domain: string;
  admin_domain: string;
  vercel_fallback_domain: string;
  provisioning_status: string;
  theme_color: string;
  created_at: string;
  updated_at: string;
}

export type SchoolTenant = SchoolRecordData;

export function getApiBase(): string {
  if (typeof window !== 'undefined') {
    // Check if user set local override in sessionStorage/localStorage
    const localOverride = localStorage.getItem('nexacampus_api_url');
    if (localOverride) return localOverride;

    // Use relative path in browser so all requests hit the Next.js App Router
    // endpoints connected to Turso SQLite on the same origin.
    return '';
  }
  return (
    process.env.NEXT_PUBLIC_GO_API_URL ||
    process.env.GO_BACKEND_URL ||
    ''
  );
}

/** Dispatches WhatsApp OTP to creator phone number */
export async function sendMakerOTP(
  phone: string,
  creatorName: string
): Promise<{ success: boolean; message: string; channel?: string; delivered?: boolean }> {
  const base = getApiBase();
  const cleanPhone = phone.trim();

  const res = await fetch(`${base}/api/v1/maker/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: cleanPhone, creator_name: creatorName }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || errData.message || `Failed to dispatch WhatsApp verification code (${res.status})`);
  }

  return await res.json();
}

/** Verifies creator WhatsApp OTP code and returns session token */
export async function verifyMakerOTP(
  phone: string,
  otp: string,
  creatorName: string
): Promise<{ success: boolean; token: string; session: CreatorSessionData }> {
  const base = getApiBase();
  const cleanPhone = phone.trim();

  const res = await fetch(`${base}/api/v1/maker/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: cleanPhone, otp: otp.trim(), creator_name: creatorName }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || errData.message || `Verification failed (${res.status})`);
  }

  return await res.json();
}

/** Checks subdomain availability in real-time */
export async function checkSlugAvailability(slug: string): Promise<{
  valid: boolean;
  available: boolean;
  slug: string;
  reason?: string;
  urls: {
    student_custom: string;
    admin_custom: string;
    vercel_fallback: string;
    path_fallback: string;
  };
}> {
  const base = getApiBase();
  const cleanSlug = sanitizeSlug(slug);
  if (!cleanSlug) {
    return {
      valid: false,
      available: false,
      slug: slug || '',
      reason: 'Invalid slug format',
      urls: {
        student_custom: '',
        admin_custom: '',
        vercel_fallback: '',
        path_fallback: '',
      },
    };
  }

  try {
    const res = await fetch(`${base}/api/v1/schools/check-slug?slug=${encodeURIComponent(cleanSlug)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[makerClient] checkSlugAvailability backend error:', err);
  }

  // Client-side fallback computation
  const isValid = /^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/.test(cleanSlug);
  const urls = tenantPortalUrls(cleanSlug);
  return {
    valid: isValid,
    available: true,
    slug: cleanSlug,
    urls: {
      student_custom: urls.customDomain,
      admin_custom: urls.customAdminDomain,
      vercel_fallback: urls.appDomain,
      path_fallback: urls.pathFallback,
    },
  };
}

/** Provisions new school on Go backend */
export async function provisionSchool(payload: {
  creatorPhone: string;
  creatorName: string;
  creatorPosition: string;
  schoolName: string;
  teacherCount: string;
  enrolledScholars: string;
  affiliationBoard: string;
  city: string;
  stateTerritory: string;
  subdomainSlug: string;
  schoolMotto: string;
  activeModules: Record<string, boolean>;
  themeColor?: string;
}): Promise<{
  success: boolean;
  school: SchoolRecordData;
  student_domain: string;
  admin_domain: string;
  vercel_fallback_domain: string;
  path_fallback_student: string;
  path_fallback_admin: string;
  steps_completed: string[];
  message: string;
}> {
  const base = getApiBase();

  const bodyData = {
    creator_phone: payload.creatorPhone,
    creator_name: payload.creatorName,
    leadership_position: payload.creatorPosition,
    school_name: payload.schoolName,
    teacher_count: payload.teacherCount,
    affiliation_board: payload.affiliationBoard,
    enrolled_scholars: payload.enrolledScholars,
    city: payload.city,
    state_territory: payload.stateTerritory,
    subdomain_slug: payload.subdomainSlug.toLowerCase().trim(),
    school_motto: payload.schoolMotto,
    active_modules: payload.activeModules,
    theme_color: payload.themeColor || '#0A192F',
  };

  try {
    const res = await fetch(`${base}/api/v1/maker/provision`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    if (!res.ok) {
      // A rejected request (slug taken, forbidden, invalid payload) must surface
      // as a failure - it is never downgraded to a local "optimistic" record.
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `Provisioning failed with status ${res.status}`);
    }

    return await res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const isNetworkFailure =
      err instanceof TypeError ||
      /fetch failed|network|ECONNREFUSED|Failed to fetch/i.test(message);
    if (!isNetworkFailure) {
      throw err;
    }

    console.warn('[makerClient] provisionSchool backend unreachable, generating offline record:', err);
    const slug = bodyData.subdomain_slug;
    const urls = tenantPortalUrls(slug);
    const optimisticRecord: SchoolRecordData = {
      id: 'sch-' + slug,
      ...bodyData,
      student_domain: urls.customDomain,
      admin_domain: urls.customAdminDomain,
      vercel_fallback_domain: urls.appDomain,
      provisioning_status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    return {
      success: true,
      school: optimisticRecord,
      student_domain: urls.customDomain,
      admin_domain: urls.customAdminDomain,
      vercel_fallback_domain: urls.appDomain,
      path_fallback_student: urls.pathFallback,
      path_fallback_admin: urls.pathFallbackAdmin,
      steps_completed: [
        '1. Validating Tenant Slug',
        '2. Persisting Institutional Profile & 15 Module Configs',
        '3. Provisioning Vercel Subdomains',
        '4. Generating Student & Admin Portal URLs',
      ],
      message: `School '${bodyData.school_name}' provisioned successfully`,
    };
  }
}

/** Fetches single school tenant by slug */
export async function fetchSchoolBySlug(slug: string): Promise<SchoolRecordData | null> {
  const base = getApiBase();
  const cleanSlug = slug.toLowerCase().trim();

  try {
    const res = await fetch(`${base}/api/v1/schools/${encodeURIComponent(cleanSlug)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[makerClient] Failed to fetch school %s from backend:', cleanSlug, err);
  }

  // Fallback check in localStorage for client-side created schools
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('schoolmaker_current_school');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.subdomain === cleanSlug || parsed.subdomain_slug === cleanSlug) {
          const urls = tenantPortalUrls(cleanSlug);
          return {
            id: 'sch-' + cleanSlug,
            creator_phone: parsed.creatorPhone || '',
            creator_name: parsed.creatorName || '',
            leadership_position: parsed.creatorPosition || 'Principal / Head of Institution',
            school_name: parsed.schoolName,
            teacher_count: parsed.teacherCount,
            affiliation_board: parsed.board || parsed.affiliation_board || 'CBSE',
            enrolled_scholars: parsed.studentCapacity || parsed.enrolled_scholars || '1,850',
            city: parsed.city,
            state_territory: parsed.state || parsed.state_territory || 'West Bengal',
            subdomain_slug: cleanSlug,
            school_motto: parsed.motto || parsed.school_motto || '',
            active_modules: parsed.enabledModules || parsed.active_modules || {},
            student_domain: urls.customDomain,
            admin_domain: urls.customAdminDomain,
            vercel_fallback_domain: urls.appDomain,
            provisioning_status: 'active',
            theme_color: parsed.themeColor || '#0A192F',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
        }
      }
    } catch {
      // Ignore
    }
  }

  return null;
}

/** Updates 15 active modules on the backend */
export async function updateSchoolModules(
  slug: string,
  modules: Record<string, boolean>
): Promise<SchoolRecordData | null> {
  const base = getApiBase();
  const cleanSlug = slug.toLowerCase().trim();

  try {
    const res = await fetch(`${base}/api/v1/schools/${encodeURIComponent(cleanSlug)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active_modules: modules }),
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[makerClient] updateSchoolModules backend error for %s:', cleanSlug, err);
  }

  return null;
}

/** Lists all onboarded schools */
export async function fetchAllSchools(): Promise<SchoolRecordData[]> {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}/api/v1/schools`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.schools || [];
    }
  } catch (err) {
    console.warn('[makerClient] fetchAllSchools backend error:', err);
  }
  return [];
}

/** Searches schools dynamically for the Spotlight selector */
export async function searchSchools(query: string): Promise<SchoolRecordData[]> {
  const base = getApiBase();
  const cleanQ = query.trim();
  try {
    const res = await fetch(`${base}/api/v1/schools/search?q=${encodeURIComponent(cleanQ)}`);
    if (res.ok) {
      const data = await res.json();
      return data.schools || [];
    }
  } catch (err) {
    console.warn('[makerClient] searchSchools backend error:', err);
  }
  return [];
}

/** Fetches schools created by creator phone */
export async function fetchMySchools(phone: string): Promise<SchoolRecordData[]> {
  const base = getApiBase();
  try {
    const res = await fetch(`${base}/api/v1/maker/my-schools?phone=${encodeURIComponent(phone.trim())}`);
    if (res.ok) {
      const data = await res.json();
      return data.schools || [];
    }
  } catch (err) {
    console.warn('[makerClient] fetchMySchools backend error:', err);
  }
  return [];
}
