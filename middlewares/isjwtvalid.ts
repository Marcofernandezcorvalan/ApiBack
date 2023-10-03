import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/users";

export const isJWTvalid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	const token = req.headers["x-token"] as string;

	if (!token) {
		res.status(400).json({
			msg: "No se encontró un token en la petición.",
		});
		return;
	}

	try {
		const pass = process.env.JWT_PASS as string;
		const payload = jwt.verify(token, pass) as JwtPayload;
		const { id } = payload;

		const validUser: IUser | null = await User.findById(id);

		if (!validUser) {
			res.status(404).json({
				msg: "No se encontró el Usuario",
			});
			return;
		}

		req.body.validUser = validUser;

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg: "token invalido",
		});
	}
};
