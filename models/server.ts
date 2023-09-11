import express, { Express } from "express";
import cors from "cors";
import authRoutes from "../routes/auth";
import { dbConect } from "../database/config";

export class Server {
	app: Express;
	port: string | number | undefined;
	authPath: string;

	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.authPath = "/auth";
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
	}

	listen(): void {
		this.app.listen(this.port, () => {
			console.log(`Running on port ${this.port}`);
		});
	}
}
