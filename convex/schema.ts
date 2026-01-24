import { defineSchema } from "convex/server";
import { usersTable } from "./schemas/users";
import { accountsTable, sessionsTable } from "./schemas/accounts";
import { glcTable } from "./schemas/glc";

export default defineSchema({
  users: usersTable,
  accounts: accountsTable,
  sessions: sessionsTable,
  glc: glcTable,
});
