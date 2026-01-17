import { defineSchema } from "convex/server";
import { usersTable } from "./schemas/users";
import { accountsTable, sessionsTable } from "./schemas/accounts";

export default defineSchema({
  users: usersTable,
  accounts: accountsTable,
  sessions: sessionsTable,
});
