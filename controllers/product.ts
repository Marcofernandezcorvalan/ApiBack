import { Request, Response } from "express";
import Product from "../models/products";

export const getData = async (req: Request, res: Response) => {
	const products = await Product.find({});
	res.send({
		...products,
	});
};
