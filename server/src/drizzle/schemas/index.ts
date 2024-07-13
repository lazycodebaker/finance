import { relations, sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { z } from "zod";

// Define Zod schemas for validation
export const userSchema = z.object({
  _id: z.string().uuid(),
  username: z.string(),
  password: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const incomeSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string(),
  amount: z.number().int(),
  source: z.string(),
  category: z.string(),
  date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const expenseSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string().uuid(),
  amount: z.number().int(),
  category: z.string(),
  description: z.string(),
  date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const budgetSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string().uuid(),
  category: z.string(),
  limit: z.number().int(),
  date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const investmentSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.string(),
  name: z.string(),
  amount: z.number().int(),
  current_value: z.number().int(),
  purchase_date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const savingsSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string().uuid(),
  goal_name: z.string(),
  target_amount: z.number().int(),
  current_amount: z.number().int(),
  target_date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const transactionSchema = z.object({
  _id: z.string().uuid(),
  user_id: z.string().uuid(),
  type: z.string(),
  amount: z.number().int(),
  category: z.string(),
  description: z.string(),
  date: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

// Define tables using Drizzle ORM
export const userTable = sqliteTable("users", {
  _id: text("id").notNull().primaryKey().unique(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

export const incomeTable = sqliteTable("income", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  amount: integer("amount"),
  source: text("source"),
  category: text("category"),
  date: text("date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const expenseTable = sqliteTable("expenses", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  amount: integer("amount"),
  category: text("category"),
  description: text("description"),
  date: text("date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const budgetTable = sqliteTable("budgets", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  category: text("category"),
  limit: integer("limit"),
  date: text("date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const investmentTable = sqliteTable("investments", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  type: text("type"),
  name: text("name"),
  amount: integer("amount"),
  current_value: integer("current_value"),
  purchase_date: text("purchase_date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const savingsTable = sqliteTable("savings", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  goal_name: text("goal_name"),
  target_amount: integer("target_amount"),
  current_amount: integer("current_amount"),
  target_date: text("target_date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export const transactionTable = sqliteTable("transactions", {
  _id: text("id").notNull().primaryKey().unique(),
  user_id: text("user_id").notNull(),
  type: text("type"),
  amount: integer("amount"),
  category: text("category"),
  description: text("description"),
  date: text("date"),
  createdAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

// Define relations
export const userRelations = relations(userTable, ({ many, one }) => ({
  income: one(incomeTable, {
    references: [incomeTable.user_id],
    fields: [userTable._id],
  }),
  expenses: many(expenseTable),
  budgets: many(budgetTable),
  investments: many(investmentTable),
  savings: many(savingsTable),
  transactions: many(transactionTable)
}));

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

// Type inference using Zod schemas
export type TUser = z.infer<typeof userSchema>;
export type TIncome = z.infer<typeof incomeSchema>;
export type TExpense = z.infer<typeof expenseSchema>;
export type TBudget = z.infer<typeof budgetSchema>;
export type TInvestment = z.infer<typeof investmentSchema>;
export type TSavings = z.infer<typeof savingsSchema>;
export type TTransaction = z.infer<typeof transactionSchema>;
