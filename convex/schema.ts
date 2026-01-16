import { defineSchema } from "convex/server";
import { usersTable } from "./schemas/users";

export default defineSchema({
  users: usersTable,
});
