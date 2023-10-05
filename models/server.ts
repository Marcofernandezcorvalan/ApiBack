import express, { Express } from "express";
import cors from "cors";
import authRoutes from "../routes/auth";
import { dbConect } from "../database/config";
import productsRoutes from "../routes/products";
import ordersRoutes from "../routes/orders";
import homeRoutes from "../routes/home";

export class Server {
	app: Express;
	port: string | number | undefined;
	authPath: string;
	productPath: string;
	ordersPath: string;
	homePath: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.authPath = "/auth";
		this.productPath = "/products";
		this.ordersPath = "/orders";
		this.homePath = "/";

		this.conectDB();
		this.middlewares();
		this.routes();
	}

	async conectDB(): Promise<void> {
		await dbConect();
	}

	middlewares(): void {
		this.app.use(express.json());
		this.app.use(cors());
	}

	routes(): void {
		this.app.use(this.authPath, authRoutes);
		this.app.use(this.ordersPath, ordersRoutes);
		this.app.use(this.productPath, productsRoutes);
		this.app.use(this.homePath, homeRoutes);
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Running on port ${this.port}`);
		});
	}
}
