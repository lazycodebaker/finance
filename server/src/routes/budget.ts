
import { z } from "zod";
import { Context, Hono } from "hono";
import { budgetSchema, budgetTable, TBudget, userTable } from "@/drizzle/schemas";
import { v4 } from "uuid";
import { db } from "@/db/client";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { responseFunc } from "@/helper/response";

const budgetRouter = new Hono();

const TBudgetCreateBody = budgetSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true,
});

type TBudgetCreateBody = z.infer<typeof TBudgetCreateBody>;

budgetRouter.post("/create", zValidator('json', TBudgetCreateBody), async (c: Context) => {
    try {
        const budgetData = await TBudgetCreateBody.parseAsync(await c.req.json());

        const newBudget: TBudget = {
            ...budgetData,
            _id: v4(),
            user_id: c.get("user")._id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const response = await db.insert(budgetTable).values(newBudget);
        if (!response) return responseFunc({ message: "Budget not created", data: response, status: 500 });

        return responseFunc({ message: "Budget created", status: 200 });
    } catch (error) {
        console.log(error);
        return responseFunc({ message: "Budget not created", data: error, status: 500 });
    }
});

budgetRouter.get('/all', async (c) => {
    try {
        const response = await db
            .select()
            .from(budgetTable)
            .leftJoin(userTable, eq(budgetTable.user_id, userTable._id))
            .all();

        const transformedResponse = response.map(row => ({
            expense: {
                ...row.budgets,
                user: row.users,
            }
        }));

        if (!response) return responseFunc({ message: "Budget not found", status: 404 });

        return responseFunc({ message: "All Budgets", data: transformedResponse, status: 200 });
    } catch (error) {
        console.log(error);
        return responseFunc({ message: "Budget not found", data: error, status: 500 });
    }
});

budgetRouter.delete("/delete/:id", zValidator('param', z.object({ id: z.string() })), async (c) => {
    try {
        const id = c.req.param("id"); 

        const response = await db
            .delete(budgetTable)
            .where(eq(budgetTable._id, id));

        if (!response) return responseFunc({ message: "Budget not found", status: 404 });
        return responseFunc({ message: "Budget deleted", status: 200 });
    } catch (error) {
        console.log(error);
        return responseFunc({ message: "Budget not found", data: error, status: 500 });
    }
});

export default budgetRouter;