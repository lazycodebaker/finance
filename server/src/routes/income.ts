
import { z } from "zod";
import { Hono } from "hono";
import { incomeSchema, incomeTable, TIncome, userTable } from "@/drizzle/schemas";
import { v4 } from "uuid";
import { db } from "@/db/client";
import { handleUser } from "@/auth/manager";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

const incomeRouter = new Hono();

const TIncomeCreateBody = incomeSchema.omit({
    _id: true,
    createdAt: true,
    updatedAt: true
});

type TIncomeCreateBody = z.infer<typeof TIncomeCreateBody>;

incomeRouter.post("/create", handleUser, zValidator('form', TIncomeCreateBody), async (c) => {
    try {
        const incomeData = await TIncomeCreateBody.parseAsync(await c.req.json());

        const newIncome: TIncome = {
            ...incomeData,
            _id: v4(),
            user_id: c.get("user")._id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const response = await db.insert(incomeTable).values(newIncome);

        const lastInsertRowid = response.toJSON()['lastInsertRowid'];
        if (!lastInsertRowid) return c.json({ ok: false, message: "Income not created" });

        const _response = new Response(JSON.stringify({
            ok: true,
            message: "Income created",
            data: newIncome
        }), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return _response;
    } catch (error) {
        return c.json({ ok: false, message: "Income not created" });
    }
});

incomeRouter.get("/all", async (c) => {
    try {
        const response = await db
            .select()
            .from(incomeTable)
            .leftJoin(userTable, eq(incomeTable.user_id, userTable._id))
            .all();

        const transformedResponse = response.map(row => ({
            income: {
                ...row.income,
                user: row.users,
            }
        }));

        if (!response) return c.json({ ok: false, message: "Income not found" });

        return c.json({ ok: true, message: "All Incomes", data: transformedResponse });
    } catch (error) {
        return c.json({ ok: false, message: "Income not found" });
    }
});

incomeRouter.delete("/delete/:id", zValidator('param', z.object({ id: z.string() })), async (c) => {
    try {
        const id = c.req.param("id");

        const response = await db
            .delete(incomeTable)
            .where(eq(incomeTable._id, id))
            .run();

        if (!response) return c.json({ ok: false, message: "Income not found" });

        return c.json({ ok: true, message: "Income deleted" });
    } catch (error) {
        return c.json({ ok: false, message: "Income not found" });
    };
});


export default incomeRouter;