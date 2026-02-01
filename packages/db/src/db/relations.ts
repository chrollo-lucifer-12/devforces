import { relations } from "drizzle-orm/relations";
import {
  user,
  session,
  account,
  admin,
  contest,
  challenge,
  test,
  submission,
} from "./schema";

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
  submission: many(submission),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const adminRelations = relations(admin, ({ one, many }) => ({
  user: one(user, {
    fields: [admin.userId],
    references: [user.id],
  }),
  contest: many(contest),
}));

export const contestRelations = relations(contest, ({ one, many }) => ({
  admin: one(admin, {
    fields: [contest.creatorId],
    references: [admin.userId],
  }),
  challenge: many(challenge),
}));

export const challengeRelations = relations(challenge, ({ one, many }) => ({
  contest: one(contest, {
    fields: [challenge.contestId],
    references: [contest.id],
  }),
  test: many(test),
  submission: many(submission),
}));

export const testRelations = relations(test, ({ one }) => ({
  challenge: one(challenge, {
    fields: [test.challengeId],
    references: [challenge.id],
  }),
}));

export const submissionRelations = relations(submission, ({ one }) => ({
  user: one(user, {
    fields: [submission.userId],
    references: [user.id],
  }),
  challenge: one(challenge, {
    fields: [submission.challengeId],
    references: [challenge.id],
  }),
}));
