// ============================================================
// LENSIFY ROLE PERMISSIONS
// ============================================================

export const ROLE_PERMISSIONS = {
  OWNER: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: true,
    receipts: true,
    payments: true,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: true,
    users: true,
    activityLogs: true,
    settings: true,
    profile: true,
  },

  ADMIN: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: true,
    receipts: true,
    payments: true,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: true,
    users: true,
    activityLogs: true,
    settings: true,
    profile: true,
  },

  MANAGER: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: true,
    receipts: true,
    payments: true,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: true,
    users: false,
    activityLogs: false,
    settings: false,
    profile: true,
  },

  EMPLOYEE: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: true,
    receipts: true,
    payments: true,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: false,
    users: false,
    activityLogs: false,
    settings: false,
    profile: true,
  },

  RECEPTIONIST: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: true,
    receipts: true,
    payments: true,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: false,
    users: false,
    activityLogs: false,
    settings: false,
    profile: true,
  },

  OPTOMETRIST: {
    dashboard: true,
    customers: true,
    prescriptions: true,
    orders: false,
    receipts: false,
    payments: false,
    products: true,
    categories: true,
    lenses: true,
    appointments: true,
    reports: false,
    users: false,
    activityLogs: false,
    settings: false,
    profile: true,
  },
};

// ============================================================
// GET CURRENT USER ROLE
// ============================================================

export const getCurrentRole = () => {
  const role = localStorage.getItem("role");

  if (!role) {
    return null;
  }

  return role.replace("ROLE_", "").trim().toUpperCase();
};

// ============================================================
// GET CURRENT USER PERMISSIONS
// ============================================================

export const getCurrentPermissions = () => {
  const role = getCurrentRole();

  if (!role) {
    return {};
  }

  return ROLE_PERMISSIONS[role] || {};
};

// ============================================================
// CHECK PERMISSION
// ============================================================

export const hasPermission = (permission) => {
  const permissions = getCurrentPermissions();

  return permissions[permission] === true;
};
