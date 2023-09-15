import { Model, Schema, model } from "mongoose";

export interface IProduct {
	id: number;
	name: string;
	precio: number;
	category: string;
	img: string;
}

const ProductSchema = new Schema<IProduct>({
	id: {
		type: Number,
	},
	name: {
		type: String,
	},
	precio: {
		type: Number,
	},
	category: {
		type: String,
	},
	img: {
		type: String,
	},
});

ProductSchema.methods.toJSON = function () {
	const { __v, _id, ...product } = this.toObject();
	return product;
};

const Product: Model<IProduct> = model<IProduct>("Product", ProductSchema);

export default Product;
