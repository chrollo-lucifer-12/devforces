import { relations } from "drizzle-orm/relations";
import { user, session, account, admin } from "./schema";

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  admins: many(admin),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const adminRelations = relations(admin, ({ one }) => ({
  user: one(user, {
    fields: [admin.userId],
    references: [user.id],
  }),
}));
