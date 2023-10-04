import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, { IItem, IOrder, IShippingDetails } from "../models/orders";

export const getOrders = async (req: Request, res: Response) => {
	const userID: ObjectId = req.body.validUser._id;

	const consulta = { user: userID };

	const orders = await Order.find(consulta);

	res.json({
		data: [...orders],
	});
};

export const createOrder = async (req: Request, res: Response) => {
	const orderData: IOrder = req.body;
	const userID: ObjectId = req.body.validUser._id;

	const data = {
		...orderData,
		user: userID,
		createdAt: new Date(),
		status: "pending",
	};

	const order = new Order(data);

	await order.save();

	res.status(201).json({
		order,
	});
};
