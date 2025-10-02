import { relations } from "drizzle-orm/relations";
import { user, account, session, eods } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	eods: many(eods),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const eodsRelations = relations(eods, ({one}) => ({
	user: one(user, {
		fields: [eods.userId],
		references: [user.id]
	}),
}));