import { getMongoDb, ObjectId } from "@/lib/mongodb";

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

export const reminderService = {
  // Create event reminder in MongoDB
  async createReminder(input: ReminderInput) {
    const db = await getMongoDb();
    const newReminder = {
      user_id: input.user_id,
      reminder_type: input.reminder_type,
      event_name: input.event_name,
      event_date: new Date(input.event_date),
      notify_days_before: input.notify_days_before || 3,
      notes: input.notes || "",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const res = await db.collection("followup_reminders").insertOne(newReminder);
    return { ...newReminder, id: res.insertedId.toString() };
  },

  // Get active reminders for user from MongoDB
  async getUserReminders(userId: string) {
    const db = await getMongoDb();
    const reminders = await db
      .collection("followup_reminders")
      .find({ user_id: userId, is_active: true })
      .sort({ event_date: 1 })
      .toArray();

    return reminders.map((r) => ({ ...r, id: r._id.toString() }));
  },

  // Delete reminder in MongoDB
  async deleteReminder(reminderId: string) {
    const db = await getMongoDb();
    await db.collection("followup_reminders").deleteOne({ _id: new ObjectId(reminderId) });
  },
};
