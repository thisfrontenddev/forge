import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Posts = pgTable("posts", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostsSchema = createInsertSchema(Posts, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const Users = pgTable("users", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }),
  email: t.varchar({ length: 255 }).notNull(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  image: t.varchar({ length: 255 }),
}));

export const UsersRelations = relations(Users, ({ many }) => ({
  accounts: many(Accounts),
}));

export const Accounts = pgTable(
  "accounts",
  (t) => ({
    userId: t
      .uuid()
      .notNull()
      .references(() => Users.id, { onDelete: "cascade" }),
    type: t
      .varchar({ length: 255 })
      .$type<"email" | "oauth" | "oidc" | "webauthn">()
      .notNull(),
    provider: t.varchar({ length: 255 }).notNull(),
    providerAccountId: t.varchar({ length: 255 }).notNull(),
    refresh_token: t.varchar({ length: 255 }),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.varchar({ length: 255 }),
    scope: t.varchar({ length: 255 }),
    id_token: t.text(),
    session_state: t.varchar({ length: 255 }),
  }),
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const AccountsRelations = relations(Accounts, ({ one }) => ({
  user: one(Users, { fields: [Accounts.userId], references: [Users.id] }),
}));

export const Sessions = pgTable("sessions", (t) => ({
  sessionToken: t.varchar({ length: 255 }).notNull().primaryKey(),
  userId: t
    .uuid()
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
}));

export const SessionsRelations = relations(Sessions, ({ one }) => ({
  user: one(Users, { fields: [Sessions.userId], references: [Users.id] }),
}));

// Workouts Table
export const Workouts = pgTable("workouts", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t
    .uuid()
    .notNull()
    .references(() => Users.id, { onDelete: "cascade" }),
  date: t.timestamp({ mode: "date", withTimezone: true }).defaultNow(),
}));

export const WorkoutsRelations = relations(Workouts, ({ one, many }) => ({
  user: one(Users, { fields: [Workouts.userId], references: [Users.id] }),
  workoutLogs: many(WorkoutLogs),
}));

// Exercises Table
export const Exercises = pgTable("exercises", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 255 }).notNull().unique(),
}));

export const ExercisesRelations = relations(Exercises, ({ many }) => ({
  workoutLogs: many(WorkoutLogs),
}));

// Workout Logs Table
export const WorkoutLogs = pgTable("workout_logs", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  workoutId: t
    .uuid()
    .notNull()
    .references(() => Workouts.id, { onDelete: "cascade" }),
  exerciseId: t
    .uuid()
    .notNull()
    .references(() => Exercises.id, { onDelete: "cascade" }),
  setNumber: t.integer().notNull(),
  reps: t.integer().notNull(),
  weight: t.numeric("decimal", { precision: 6, scale: 2 }),
}));

export const WorkoutLogsRelations = relations(WorkoutLogs, ({ one }) => ({
  workout: one(Workouts, {
    fields: [WorkoutLogs.workoutId],
    references: [Workouts.id],
  }),
  exercise: one(Exercises, {
    fields: [WorkoutLogs.exerciseId],
    references: [Exercises.id],
  }),
}));
