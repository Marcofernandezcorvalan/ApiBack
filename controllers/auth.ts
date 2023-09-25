import { Request, Response } from "express";
import User, { IUser } from "../models/users";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";

export const register = async (req: Request, res: Response) => {
	const { name, email, password }: IUser = req.body;

	const user = new User({ name, email, password });

	const salt = bcryptjs.genSaltSync();

	user.password = bcryptjs.hashSync(password, salt);

	const code = randomstring.generate(7);

	user.code = code;

	await user.save();

	await sendEmail(email, code);

	res.status(201).json({
		user,
	});
};
