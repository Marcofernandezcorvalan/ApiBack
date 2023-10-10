import { Model, Schema, Types, model } from "mongoose";

export interface IItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	img: string;
}

export interface IShippingDetails {
	name: string;
	cellphone: string;
	location: string;
	address: string;
}

export interface IOrder {
	createdAt: Date;
	user: Types.ObjectId;
	price: Number;
	items: IItem[];
	shippingDetails: IShippingDetails[];
	total: Number;
	status: String;
}

const OrderSchema = new Schema<IOrder>({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	items: {
		type: [
			{
				id: {
					type: Number,
					required: true,
				},
				name: {
					type: String,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				img: {
					type: String,
					required: true,
				},
			},
		],
		required: true,
	},
	shippingDetails: {
		name: {
			type: String,
			required: true,
		},
		cellphone: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
});

const Order: Model<IOrder> = model<IOrder>("Order", OrderSchema);

export default Order;
