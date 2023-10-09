import { NextFunction, Request, Response } from "express";

export const validateVerified = (req: Request, res: Response, next: NextFunction) => {
	const { verified } = req.body.validUser;

	if (!verified) {
		res.status(401).json({
			msg: "Usuario no Verificado",
		});
		return;
	}
	next();
};

// export const validateItems = (req: Request, res: Response, next: NextFunction) => {
// 	const { name, price, quantity, id } = req.body.items.array;

// 	if (!name || !price || !quantity || !id) {
// 		res.status(400).json({
// 			msg: "Faltan campos a completar",
// 		});
// 		return;
// 	}
// 	next();
// };
