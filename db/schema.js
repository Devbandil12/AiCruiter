
import { sql } from "drizzle-orm";
import { integer, json, jsonb, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),

  email: varchar({ length: 255 }).notNull().unique(),
});

export const interviewDetailsTable=pgTable("interviewtable",{
  id:uuid().defaultRandom().primaryKey(),
  jobRole:text("jobRole").notNull(),
  jobdescription:text("jobdescription").notNull(),
  inertviewtype:text("inertviewtype").notNull(),
  jobduration:text("jobduration").notNull(),
  questionlist:jsonb(),
  useremail:varchar().references(()=>usersTable.email),
  createdat:text("created_at").default("now()"),
  completed:text("status").default("false")
})
export const feedbacktable=pgTable("feedback",{
  id:uuid("id").defaultRandom().primaryKey(),
  useremail:text("email").notNull(),
  interviewid:text("interviewid").notNull(),
  feedback:jsonb(),
  recomond:jsonb()
})
