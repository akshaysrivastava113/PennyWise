
import express, { Request, Response } from "express";
import { calculateExpenses } from "../services/calculateexpenses";

const app = express();

app.post('/data', async (req: Request, res: Response) => {
    const sinceDate = req.body.sinceDate;
    const beforeDate = req.body.beforeDate;
    const emails = await calculateExpenses(sinceDate, beforeDate);
    res.send(emails);
});

export default app;