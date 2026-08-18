import React, { useState, useEffect, useMemo } from "react";
import { adminService } from "../../../services/adminService";
import {
  Search,
  MoreVertical,
  UserPlus,
  Eye,
  Edit2,
  ShoppingBag,
  Shield,
  Ban,
  CheckCircle2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  User as UserIcon,
  Phone,
  Mail,
  Calendar,
  Clock,
  MapPin,
  Save,
} from "lucide-react";

export type UserRole = "Customer" | "Seller" | "Admin";
export type UserStatus = "Active" | "Inactive" | "Suspended";

export interface UserRecord {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinedDate: string;
  accountId: string;
  accountType: string;
  avatar?: string;
  totalOrders: number;
  totalSpent: number;
  lastLogin: string;
  addresses?: string[];
  recentOrders?: Array<{ id: string; amount: number; date: string; status: string }>;
}

const DEFAULT_USERS: UserRecord[] = [
  {
    _id: "usr_101",
    name: "Rajan",
    email: "rajan@example.com",
    phone: "+91 98765 10101",
    role: "Customer",
    status: "Active",
    joinedDate: "6/8/2026",
    accountId: "usr8a7f0",
    accountType: "Customer Account",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    totalOrders: 8,
    totalSpent: 4850,
    lastLogin: "2 hours ago",
    addresses: ["Flat 402, Sunshine Apts, Kothrud, Pune - 411038"],
    recentOrders: [
      { id: "ORD-2026-901", amount: 1240, date: "6/8/2026", status: "Delivered" },
      { id: "ORD-2026-842", amount: 499, date: "5/24/2026", status: "Delivered" },
    ],
  },
  {
    _id: "usr_102",
    name: "PankDesai",
    email: "pankdesai@example.com",
    phone: "+91 98765 20202",
    role: "Seller",
    status: "Active",
    joinedDate: "5/7/2026",
    accountId: "sel82d4a",
    accountType: "Seller Account",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    totalOrders: 42,
    totalSpent: 38400,
    lastLogin: "30 mins ago",
    addresses: ["Flower Market Yard, Stall #14, Gultekdi, Pune"],
    recentOrders: [
      { id: "ORD-2026-912", amount: 5600, date: "6/7/2026", status: "Confirmed" },
    ],
  },
  {
    _id: "usr_103",
    name: "Aj7Thevil",
    email: "aj7thevil@example.com",
    phone: "+91 98765 30303",
    role: "Admin",
    status: "Active",
    joinedDate: "5/5/2026",
    accountId: "adm1092e",
    accountType: "Admin Account",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    totalOrders: 15,
    totalSpent: 12400,
    lastLogin: "Just now",
    addresses: ["Pushpangan HQ, Market Yard, Pune - 411037"],
    recentOrders: [],
  },
  {
    _id: "usr_104",
    name: "Purva_Palav",
    email: "purva@example.com",
    phone: "+91 98765 40404",
    role: "Customer",
    status: "Active",
    joinedDate: "5/4/2026",
    accountId: "usr93f81",
    accountType: "Customer Account",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    totalOrders: 5,
    totalSpent: 2950,
    lastLogin: "Yesterday",
    addresses: ["Villa 12, Rose Colony, Baner, Pune"],
    recentOrders: [
      { id: "ORD-2026-788", amount: 899, date: "5/4/2026", status: "Delivered" },
    ],
  },
  {
    _id: "usr_105",
    name: "Calligre",
    email: "calligre@example.com",
    phone: "+91 98765 50505",
    role: "Seller",
    status: "Inactive",
    joinedDate: "4/28/2026",
    accountId: "sel44c10",
    accountType: "Seller Account",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    totalOrders: 18,
    totalSpent: 14200,
    lastLogin: "5 days ago",
    addresses: ["Greenhouse Floral Hub, Hadapsar, Pune"],
    recentOrders: [],
  },
  {
    _id: "usr_106",
    name: "Swapnil_Sakhare",
    email: "swapnil@example.com",
    phone: "+91 98765 60606",
    role: "Customer",
    status: "Suspended",
    joinedDate: "4/20/2026",
    accountId: "usr11a94",
    accountType: "Customer Account",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    totalOrders: 2,
    totalSpent: 850,
    lastLogin: "2 weeks ago",
    addresses: ["Block B, MG Road, Camp, Pune"],
    recentOrders: [],
  },
  {
    _id: "usr_107",
    name: "Satya_Rege",
    email: "satya@example.com",
    phone: "+91 98765 70707",
    role: "Customer",
    status: "Active",
    joinedDate: "4/15/2026",
    accountId: "usr55b22",
    accountType: "Customer Account",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    totalOrders: 12,
    totalSpent: 9600,
    lastLogin: "3 hours ago",
    addresses: ["Sunshine Towers, FC Road, Pune"],
    recentOrders: [
      { id: "ORD-2026-610", amount: 1500, date: "4/15/2026", status: "Delivered" },
    ],
  },
  {
    _id: "usr_108",
    name: "Nitin",
    email: "nitin@example.com",
    phone: "+91 98765 80808",
    role: "Seller",
    status: "Active",
    joinedDate: "4/10/2026",
    accountId: "sel77d99",
    accountType: "Seller Account",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    totalOrders: 29,
    totalSpent: 26500,
    lastLogin: "1 day ago",
    addresses: ["Blossom Farms, Talegaon, Pune"],
    recentOrders: [],
  },
  {
    _id: "usr_109",
    name: "Harsh_Artworks",
    email: "harsh@example.com",
    phone: "+91 98765 90909",
    role: "Customer",
    status: "Active",
    joinedDate: "4/02/2026",
    accountId: "usr33e11",
    accountType: "Customer Account",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    totalOrders: 7,
    totalSpent: 5100,
    lastLogin: "Yesterday",
    addresses: ["Aundh IT Park Rd, Pune"],
    recentOrders: [
      { id: "ORD-2026-550", amount: 750, date: "4/02/2026", status: "Delivered" },
    ],
  },
];

export const CustomersView: React.FC = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All Roles");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [sortBy, setSortBy] = useState<string>("Newest Joined");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Selected User Detail Drawer
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Modals
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userForm, setUserForm] = useState<UserRecord>({
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    status: "Active",
    joinedDate: new Date().toLocaleDateString(),
    accountId: "usr" + Math.random().toString(36).substring(2, 8),
    accountType: "Customer Account",
    avatar: "",
    totalOrders: 0,
    totalSpent: 0,
    lastLogin: "Just now",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserRecord | null>(null);

  // Open Actions Dropdown Track
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const saved = localStorage.getItem("pushpangan_admin_users");
      if (saved) {
        setUsers(JSON.parse(saved));
      } else {
        setUsers(DEFAULT_USERS);
        localStorage.setItem("pushpangan_admin_users", JSON.stringify(DEFAULT_USERS));
      }
    } catch (e) {
      console.error(e);
      setUsers(DEFAULT_USERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    // Real-time synchronization for newly registered users
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "pushpangan_admin_users") {
        fetchUsers();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const saved = localStorage.getItem("pushpangan_admin_users");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUsers((prev) => (JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev));
        } catch (e) {}
      }
    }, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const saveUsers = (updated: UserRecord[]) => {
    setUsers(updated);
    localStorage.setItem("pushpangan_admin_users", JSON.stringify(updated));
  };

  // Filtering & Sorting
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        // Search
        const q = search.toLowerCase();
        const matchesSearch =
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.phone.includes(q) ||
          u.accountId.toLowerCase().includes(q);

        if (!matchesSearch) return false;

        // Role
        if (roleFilter !== "All Roles" && u.role !== roleFilter) return false;

        // Status
        if (statusFilter !== "All Status" && u.status !== statusFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
        if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
        if (sortBy === "Oldest Joined") return a._id.localeCompare(b._id);
        return b._id.localeCompare(a._id); // Newest Joined default
      });
  }, [users, search, roleFilter, statusFilter, sortBy]);

  // Pagination Slice
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredUsers.slice(start, start + rowsPerPage);
  }, [filteredUsers, currentPage, rowsPerPage]);

  // Actions
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setUserForm({
      _id: "",
      name: "",
      email: "",
      phone: "",
      role: "Customer",
      status: "Active",
      joinedDate: new Date().toLocaleDateString(),
      accountId: "usr" + Math.random().toString(36).substring(2, 8),
      accountType: "Customer Account",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      totalOrders: 0,
      totalSpent: 0,
      lastLogin: "Just now",
    });
    setShowAddEditModal(true);
  };

  const handleOpenEditModal = (user: UserRecord) => {
    setIsEditing(true);
    setUserForm({ ...user });
    setShowAddEditModal(true);
    setOpenActionId(null);
  };

  const handleSaveUserForm = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: UserRecord[] = [];

    const accountType =
      userForm.role === "Seller"
        ? "Seller Account"
        : userForm.role === "Admin"
        ? "Admin Account"
        : "Customer Account";

    const payload = {
      ...userForm,
      _id: userForm._id || "usr_" + Date.now(),
      accountType,
    };

    if (isEditing) {
      updated = users.map((u) => (u._id === payload._id ? payload : u));
    } else {
      updated = [payload, ...users];
    }

    saveUsers(updated);
    setShowAddEditModal(false);
    if (selectedUser && selectedUser._id === payload._id) {
      setSelectedUser(payload);
    }
  };

  const handleToggleStatus = (user: UserRecord) => {
    const nextStatus: UserStatus =
      user.status === "Active" ? "Suspended" : "Active";
    const updated = users.map((u) =>
      u._id === user._id ? { ...u, status: nextStatus } : u
    );
    saveUsers(updated);
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser({ ...selectedUser, status: nextStatus });
    }
    setOpenActionId(null);
  };

  const handleChangeRole = (user: UserRecord, newRole: UserRole) => {
    const accountType =
      newRole === "Seller"
        ? "Seller Account"
        : newRole === "Admin"
        ? "Admin Account"
        : "Customer Account";

    const updated = users.map((u) =>
      u._id === user._id ? { ...u, role: newRole, accountType } : u
    );
    saveUsers(updated);
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser({ ...selectedUser, role: newRole, accountType });
    }
    setOpenActionId(null);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    const updated = users.filter((u) => u._id !== userToDelete._id);
    saveUsers(updated);
    setShowDeleteModal(false);
    if (selectedUser && selectedUser._id === userToDelete._id) {
      setIsDrawerOpen(false);
      setSelectedUser(null);
    }
    setUserToDelete(null);
    setOpenActionId(null);
  };

  // Badge Styling Functions according to prompt:
  // Customer: Light pink bg, rose text
  // Seller: Light purple bg, purple text
  // Admin: Dark rose/red (#B83245) bg, white text
  const getRoleBadge = (role: UserRole) => {
    if (role === "Admin") {
      return (
        <span
          style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
          className="px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs border border-[#B83245]"
        >
          Admin
        </span>
      );
    }
    if (role === "Seller") {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
          Seller
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-[#B83245] border border-rose-200">
        Customer
      </span>
    );
  };

  // Status Styling according to prompt:
  // Active: Very light green bg, green text
  // Inactive: Light gray bg, gray text
  // Suspended: Light red bg, red text
  const getStatusPill = (status: UserStatus) => {
    if (status === "Active") {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Active
        </span>
      );
    }
    if (status === "Suspended") {
      return (
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
          Suspended
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
        Inactive
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans text-slate-800">
      {/* Page Heading Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 style={{ color: "#222222" }} className="text-2xl lg:text-3xl font-black tracking-tight">
            User Management
          </h1>
          <p style={{ color: "#666666" }} className="text-xs mt-1 font-medium">
            Manage Pushpangan customers, sellers, florists, and admin accounts.
          </p>
        </div>

        {/* Add User Action Button */}
        <button
          onClick={handleOpenAddModal}
          style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
          className="px-4 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-[#9E293A] transition flex items-center gap-2 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Main Container Card - White Card with Rounded Corners */}
      <div
        style={{ backgroundColor: "#FFFFFF", borderColor: "#F3E8E9" }}
        className="rounded-3xl border shadow-sm p-6 lg:p-8 space-y-6"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h2 style={{ color: "#222222" }} className="text-xl font-bold tracking-tight">
            All Users
          </h2>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search users..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 outline-none focus:border-[#B83245] focus:bg-white transition"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700"
            >
              <option>All Roles</option>
              <option>Customer</option>
              <option>Seller</option>
              <option>Admin</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#B83245] font-semibold text-slate-700"
            >
              <option>Newest Joined</option>
              <option>Oldest Joined</option>
              <option>Name A-Z</option>
              <option>Name Z-A</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 pb-3">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined</th>
                <th className="py-3 px-4">Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 text-xs">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">
                    No users found matching criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-rose-50/20 transition cursor-pointer group"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsDrawerOpen(true);
                    }}
                  >
                    {/* User Column */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {/* Circular Avatar */}
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover border border-rose-100 shadow-xs"
                          />
                        ) : (
                          <div
                            style={{ backgroundColor: "#FFFFFF", color: "#374151", border: "1.5px solid #E2DCBE" }}
                            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-xs shrink-0"
                          >
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-extrabold text-slate-900 group-hover:text-[#B83245] transition">
                            {user.name}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="py-4 px-4">{getRoleBadge(user.role)}</td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">{getStatusPill(user.status)}</td>

                    {/* Joined Date */}
                    <td className="py-4 px-4 text-slate-600 font-medium">{user.joinedDate}</td>

                    {/* Activity Column */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">{user.accountType}</div>
                      <div className="text-[11px] text-slate-400 font-mono">ID: {user.accountId}</div>
                    </td>

                    {/* Actions Column (Three Dots Menu) */}
                    <td
                      className="py-4 px-4 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() =>
                          setOpenActionId(openActionId === user._id ? null : user._id)
                        }
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Action Dropdown Menu */}
                      {openActionId === user._id && (
                        <div className="absolute right-4 mt-1 w-44 rounded-2xl bg-white border border-slate-200 shadow-xl py-2 z-30 text-left space-y-1">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDrawerOpen(true);
                              setOpenActionId(null);
                            }}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5" /> View User
                          </button>
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit User
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDrawerOpen(true);
                              setOpenActionId(null);
                            }}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> View Orders
                          </button>
                          <button
                            onClick={() => {
                              const roles: UserRole[] = ["Customer", "Seller", "Admin"];
                              const nextIdx = (roles.indexOf(user.role) + 1) % roles.length;
                              handleChangeRole(user, roles[nextIdx]);
                            }}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2"
                          >
                            <Shield className="w-3.5 h-3.5" /> Change Role
                          </button>
                          <button
                            onClick={() => handleToggleStatus(user)}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#B83245] flex items-center gap-2"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            {user.status === "Active" ? "Suspend Account" : "Activate Account"}
                          </button>
                          <div className="border-t border-slate-100 my-1" />
                          <button
                            onClick={() => {
                              setUserToDelete(user);
                              setShowDeleteModal(true);
                              setOpenActionId(null);
                            }}
                            className="w-full px-3.5 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete User
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none font-bold text-slate-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2 font-medium">
              Showing {filteredUsers.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1}-
              {Math.min(currentPage * rowsPerPage, filteredUsers.length)} of {filteredUsers.length} users
            </span>
          </div>

          <div className="flex items-center gap-1.5 self-end sm:self-auto">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                style={{
                  backgroundColor: currentPage === pg ? "#B83245" : "transparent",
                  color: currentPage === pg ? "#FFFFFF" : "#4F5535",
                  borderColor: currentPage === pg ? "#B83245" : "#E2DCBE",
                }}
                className="w-7 h-7 rounded-lg border text-xs font-bold transition flex items-center justify-center"
              >
                {pg}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="p-1.5 rounded-lg border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* User Detail Side Drawer */}
      {isDrawerOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div
            style={{ backgroundColor: "#FFFFFF" }}
            className="w-full max-w-md h-full shadow-2xl p-6 lg:p-8 overflow-y-auto space-y-6 relative border-l border-rose-100"
          >
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Avatar Header */}
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              {selectedUser.avatar ? (
                <img
                  src={selectedUser.avatar}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#B83245] shadow-sm"
                />
              ) : (
                <div
                  style={{ backgroundColor: "#FFFFFF", color: "#374151", border: "2px solid #E2DCBE" }}
                  className="w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl uppercase shadow-sm"
                >
                  {selectedUser.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedUser.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {getRoleBadge(selectedUser.role)}
                  {getStatusPill(selectedUser.status)}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-4 text-xs">
              <h4 style={{ color: "#B83245" }} className="font-extrabold text-xs uppercase tracking-wider">
                Account Details
              </h4>
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-rose-50/40 border border-rose-100/80">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Email:</span>
                  <span className="font-bold text-slate-800">{selectedUser.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Phone:</span>
                  <span className="font-bold text-slate-800">{selectedUser.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Account ID:</span>
                  <span className="font-mono font-bold text-slate-700">{selectedUser.accountId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Joined Date:</span>
                  <span className="font-bold text-slate-800">{selectedUser.joinedDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Total Orders:</span>
                  <span className="font-black text-[#B83245] text-sm">{selectedUser.totalOrders}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5">Total Spent:</span>
                  <span className="font-black text-emerald-700 text-sm">₹{selectedUser.totalSpent.toLocaleString()}</span>
                </div>
              </div>

              {/* Saved Delivery Addresses */}
              {selectedUser.addresses && selectedUser.addresses.length > 0 && (
                <div>
                  <h4 style={{ color: "#B83245" }} className="font-extrabold text-xs uppercase tracking-wider mb-2">
                    Saved Addresses
                  </h4>
                  <div className="space-y-2">
                    {selectedUser.addresses.map((addr, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#B83245] shrink-0 mt-0.5" />
                        <span>{addr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              <div>
                <h4 style={{ color: "#B83245" }} className="font-extrabold text-xs uppercase tracking-wider mb-2">
                  Recent Orders
                </h4>
                {selectedUser.recentOrders && selectedUser.recentOrders.length > 0 ? (
                  <div className="space-y-2">
                    {selectedUser.recentOrders.map((ord) => (
                      <div key={ord.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-extrabold text-slate-900">{ord.id}</div>
                          <div className="text-[10px] text-slate-400">{ord.date}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-[#B83245]">₹{ord.amount}</div>
                          <span className="text-[10px] font-bold text-emerald-700">{ord.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 text-slate-400 font-medium text-center">
                    No recent order history recorded.
                  </div>
                )}
              </div>
            </div>

            {/* Side Drawer Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <button
                onClick={() => handleOpenEditModal(selectedUser)}
                style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                className="flex-1 py-2.5 px-3 rounded-xl font-bold text-xs shadow hover:opacity-90 flex items-center justify-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Profile
              </button>
              <button
                onClick={() => handleToggleStatus(selectedUser)}
                className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 ${
                  selectedUser.status === "Active"
                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <Ban className="w-3.5 h-3.5" />
                {selectedUser.status === "Active" ? "Suspend" : "Activate"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit User Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <form
            onSubmit={handleSaveUserForm}
            style={{ backgroundColor: "#FFFFFF" }}
            className="border border-rose-100 rounded-3xl p-6 w-full max-w-md shadow-2xl relative space-y-4 text-xs"
          >
            <button
              type="button"
              onClick={() => setShowAddEditModal(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 style={{ color: "#222222" }} className="text-lg font-extrabold">
              {isEditing ? "Edit User Details" : "Add New User Account"}
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={userForm.phone}
                  onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                  className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as UserRole })}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Seller">Seller</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value as UserStatus })}
                    className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-800 outline-none focus:border-[#B83245]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddEditModal(false)}
                className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: "#B83245", color: "#FFFFFF" }}
                className="px-5 py-2 rounded-xl font-bold shadow flex items-center gap-1.5 hover:opacity-90"
              >
                <Save className="w-4 h-4" /> Save User
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete User Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-[#B83245] flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete User Account?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to permanently delete <strong>{userToDelete.name}</strong> ({userToDelete.email})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="px-5 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

