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
