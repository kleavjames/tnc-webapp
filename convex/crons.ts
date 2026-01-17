import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run session cleanup every Sunday at 3:00 AM UTC
crons.weekly(
  "cleanup expired sessions",
  { dayOfWeek: "sunday", hourUTC: 3, minuteUTC: 0 },
  internal.auth.cleanupExpiredSessions
);

export default crons;
