
import { z } from "zod";
import { Hono } from "hono";
import { expenseSchema, expenseTable, incomeTable, TExpense, userTable } from "@/drizzle/schemas";
import { v4 } from "uuid";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { handleUser } from "@/auth/manager";

const expenseRouter = new Hono();

const TExpenseCreateBody = expenseSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true
});

type TExpenseCreateBody = z.infer<typeof TExpenseCreateBody>;

const responseFunc = ({ data, message, status }: { data?: any, message: string, status: number }) => {
    return new Response(JSON.stringify({
        ok: true,
        data,
        message
    }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: status
    });
};

expenseRouter.post("/create", handleUser, async (c) => {
    try {
        const expenseData = await TExpenseCreateBody.parseAsync(await c.req.json());

        const newexpense: TExpense = {
            ...expenseData,
            _id: v4(),
            user_id: c.get("user")._id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const response = await db.insert(expenseTable).values(newexpense);

        const income = (await db
            .select()
            .from(incomeTable)
            .where(eq(incomeTable.user_id, c.get("user")._id))
            .all())![0];

        if (!income) return responseFunc({ message: "Income not found", status: 404 });

        const updatedIncome = {
            ...income,
            amount: income.amount! - newexpense.amount
        };

        await db
            .update(incomeTable)
            .set(updatedIncome)
            .where(eq(incomeTable._id, income._id));

        const lastInsertRowid = response.toJSON()['lastInsertRowid'];
        if (!lastInsertRowid) return responseFunc({ message: "Expense not created", status: 404 });

        return responseFunc({ message: "Expense created", data: newexpense, status: 201 });
    } catch (error) {
        return responseFunc({ message: "Expense not created", data: error, status: 500 });
    }
});

expenseRouter.get("/all", async (c) => {
    try {
        const response = await db
            .select()
            .from(expenseTable)
            .leftJoin(userTable, eq(expenseTable.user_id, userTable._id))
            .all();

        const transformedResponse = response.map(row => ({
            expense: {
                ...row.expenses,
                user: row.users,
            }
        }));

        if (!response) return responseFunc({ message: "Expense not found", status: 404 });

        return responseFunc({ message: "All Expenses", data: transformedResponse, status: 200 });
    } catch (error) {
        return responseFunc({ message: "Expense not found", data: error, status: 500 });
    }
});

expenseRouter.delete("/delete/:id", async (c) => {
    try {
        const id = c.req.param("id");

        const response = await db
            .delete(expenseTable)
            .where(eq(expenseTable._id, id))
            .run();

        if (!response) return c.json({ ok: false, message: "expense not found" });

        return responseFunc({ message: "expense deleted", status: 200 });
    } catch (error) {
        return responseFunc({ data: error, message: "expense not found", status: 500 });
    };
});

export default expenseRouter;