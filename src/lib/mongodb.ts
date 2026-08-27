// IMPORTANT: This file is a browser-safe stub.
// Direct MongoDB connections belong on the backend (server/), NOT in the frontend bundle.
// The frontend communicates with MongoDB exclusively via the Express REST API at API_URL.
// This file exists only to prevent import errors in legacy code that hasn't been migrated yet.

export const MONGODB_URI = "";

export async function getMongoClient(): Promise<never> {
  throw new Error(
    "[mongodb.ts] Direct MongoDB access is not allowed from the browser. " +
    "Use the backend REST API instead (e.g. /api/reminders)."
  );
}

export async function getMongoDb(_dbName = "pushpangan_db"): Promise<never> {
  throw new Error(
    "[mongodb.ts] Direct MongoDB access is not allowed from the browser. " +
    "Use the backend REST API instead (e.g. /api/reminders)."
  );
}

// Re-export ObjectId as a no-op class so imports don't break at module parse time
export class ObjectId {
  private id: string;
  constructor(id?: string) {
    this.id = id ?? Math.random().toString(36).slice(2);
  }
  toString() { return this.id; }
}
