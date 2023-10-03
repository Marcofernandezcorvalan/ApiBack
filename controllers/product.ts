import { Request, Response } from "express";
import Product from "../models/products";

export const getData = async (req: Request, res: Response) => {
	const products = await Product.find({});
	try {
		res.send({
			...products,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "error en el servidor",
		});
	}
};
