import { API_URL } from "@/config/api";

export type ReminderType =
  | "birthday"
  | "anniversary"
  | "festival"
  | "wedding"
  | "corporate_event"
  | "ganesh_festival";

export type ReminderInput = {
  user_id: string;
  reminder_type: ReminderType;
  event_name: string;
  event_date: string;
  notify_days_before?: number;
  notes?: string;
};

const BASE = `${API_URL}/api/reminders`;

function getToken(): string | null {
  try {
    return localStorage.getItem("pushpangan_token");
  } catch {
    return null;
  }
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const reminderService = {
  // Create event reminder via backend REST API
  async createReminder(input: ReminderInput) {
    const res = await fetch(BASE, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(input),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create reminder");
    return data.data ?? data;
  },

  // Get active reminders for user via backend REST API
  async getUserReminders(userId: string) {
    const res = await fetch(`${BASE}?user_id=${encodeURIComponent(userId)}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch reminders");
    return data.data ?? data;
  },

  // Delete reminder via backend REST API
  async deleteReminder(reminderId: string) {
    const res = await fetch(`${BASE}/${encodeURIComponent(reminderId)}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete reminder");
    return data;
  },
};
