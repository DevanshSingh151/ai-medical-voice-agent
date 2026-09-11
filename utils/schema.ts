import { pgTable, serial, text, integer, json, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique(),
  credits: integer("credits").default(10),
});

export const sessionChart = pgTable("session_chart", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").unique(),
  createdBy: text("created_by"),
  notes: text("notes"),
  selectedDoctor: json("selected_doctor"),
  conversation: json("conversation"),
  report: json("report"),
  createdOn: timestamp("created_on").defaultNow(),
});
