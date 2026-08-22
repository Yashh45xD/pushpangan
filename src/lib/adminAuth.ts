export const ADMIN_STORAGE_KEYS = {
  token: "adminToken",
  user: "adminUser",
  refreshToken: "adminRefreshToken",
} as const;

export const ADMIN_ROLES = ["super_admin", "admin", "manager", "inventory_manager"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole | string;
  permissions: string[];
  avatar?: string;
}

const ADMIN_SESSION_SECRET = "pushpangan-admin-v1";

type AdminAccount = AdminUser & { password: string };

/** Known admin accounts used when the backend API is unavailable (local/demo only). */
const ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: "admin-super",
    name: "Pushpangan Admin",
    email: "admin@pushpangan.com",
    password: "admin123",
    role: "super_admin",
    permissions: [
      "view_only",
      "edit",
      "delete",
      "create",
      "manage_orders",
      "manage_products",
      "manage_users",
      "manage_settings",
      "manage_admins",
    ],
  },
  {
    id: "admin-manager",
    name: "Store Manager",
    email: "manager@pushpangan.com",
    password: "manager123",
    role: "manager",
    permissions: ["view_only", "edit", "manage_orders", "manage_products"],
  },
  {
    id: "admin-inventory",
    name: "Inventory Manager",
    email: "inventory@pushpangan.com",
    password: "inventory123",
    role: "inventory_manager",
    permissions: ["view_only", "edit", "manage_products"],
  },
];

export function isAdminRole(role: string | undefined | null): boolean {
  if (!role) return false;
  return ADMIN_ROLES.includes(role as AdminRole) || role === "super_admin";
}

export function toPublicAdmin(account: AdminAccount): AdminUser {
  const { password: _password, ...admin } = account;
  return admin;
}

export function createAdminSessionToken(adminId: string): string {
  return btoa(`${adminId}:${ADMIN_SESSION_SECRET}`);
}

export function getAdminIdFromToken(token: string | null | undefined): string | null {
  if (!token) return null;
  try {
    const decoded = atob(token);
    const [adminId, secret] = decoded.split(":");
    if (secret !== ADMIN_SESSION_SECRET || !adminId) return null;
    return adminId;
  } catch {
    return null;
  }
}

export function validateLocalAdminCredentials(
  email: string,
  password: string,
): AdminUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const account = ADMIN_ACCOUNTS.find(
    (entry) => entry.email.toLowerCase() === normalizedEmail && entry.password === password,
  );
  return account ? toPublicAdmin(account) : null;
}

export function getStoredAdminSession(): { admin: AdminUser; token: string } | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem(ADMIN_STORAGE_KEYS.token);
  const adminId = getAdminIdFromToken(token);
  if (!adminId || !token) return null;

  const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.user);
  if (!saved) return null;

  try {
    const admin = JSON.parse(saved) as AdminUser;
    if (admin.id !== adminId || !isAdminRole(admin.role)) return null;
    return { admin, token };
  } catch {
    return null;
  }
}

export function persistAdminSession(admin: AdminUser, token: string) {
  localStorage.setItem(ADMIN_STORAGE_KEYS.user, JSON.stringify(admin));
  localStorage.setItem(ADMIN_STORAGE_KEYS.token, token);
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_STORAGE_KEYS.user);
  localStorage.removeItem(ADMIN_STORAGE_KEYS.token);
  localStorage.removeItem(ADMIN_STORAGE_KEYS.refreshToken);
}

export function hasValidAdminSession(): boolean {
  return getStoredAdminSession() !== null;
}
