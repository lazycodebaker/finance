import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  _id: text("id").notNull().primaryKey().unique(),
  username: text("username"),
  password: text("password"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const userRelations = relations(userTable, ({ many }) => ({
  income: many(incomeTable),
  expenses: many(expenseTable),
  budgets: many(budgetTable),
  investments: many(investmentTable),
  savings: many(savingsTable),
  transactions: many(transactionTable)
}));

export const incomeTable = sqliteTable("income", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  amount: integer("amount"),
  source: text("source"),
  category: text("category"),
  date: text("date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const expenseTable = sqliteTable("expenses", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  amount: integer("amount"),
  category: text("category"),
  description: text("description"),
  date: text("date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const budgetTable = sqliteTable("budgets", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  category: text("category"),
  limit: integer("limit"),
  date: text("date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const investmentTable = sqliteTable("investments", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  type: text("type"),
  name: text("name"),
  amount: integer("amount"),
  current_value: integer("current_value"),
  purchase_date: text("purchase_date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const savingsTable = sqliteTable("savings", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  goal_name: text("goal_name"),
  target_amount: integer("target_amount"),
  current_amount: integer("current_amount"),
  target_date: text("target_date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const transactionTable = sqliteTable("transactions", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: integer("user_id").notNull(),
  type: text("type"),
  amount: integer("amount"),
  category: text("category"),
  description: text("description"),
  date: text("date"),
  createAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updateAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});


export const incomeRelations = relations(incomeTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [incomeTable.user_id],
  }),
}));

export const expenseRelations = relations(expenseTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [expenseTable.user_id],
  }),
}));

export const budgetRelations = relations(budgetTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [budgetTable.user_id],
  }),
}));

export const investmentRelations = relations(investmentTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [investmentTable.user_id],
  }),
}));

export const savingsRelations = relations(savingsTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [savingsTable.user_id],
  }),
}));

export const transactionRelations = relations(transactionTable, ({ one }) => ({
  user: one(userTable, {
    references: [userTable._id],
    fields: [transactionTable.user_id],
  }),
}));

export type TUser = typeof userTable.$inferSelect;
export type TIncome = typeof incomeTable.$inferSelect;
export type TExpense = typeof expenseTable.$inferSelect;
export type TBudget = typeof budgetTable.$inferSelect;
export type TInvestment = typeof investmentTable.$inferSelect;
export type TSavings = typeof savingsTable.$inferSelect;
export type TTransaction = typeof transactionTable.$inferSelect;
