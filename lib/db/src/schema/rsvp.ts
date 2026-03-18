import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const rsvpsTable = pgTable("rsvps", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  whatsapp: text("whatsapp").notNull(),
  companions: text("companions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRsvpSchema = createInsertSchema(rsvpsTable).omit({ id: true, createdAt: true });
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvpsTable.$inferSelect;
