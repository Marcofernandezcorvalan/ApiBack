import { Request, Response } from "express";

export const getOrders = (req: Request, res: Response) => {
	console.log(req.body.validUser);
};
