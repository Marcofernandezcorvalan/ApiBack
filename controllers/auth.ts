import { Request, Response } from "express";
import User, { IUser } from "../models/users";
import bcryptjs from "bcryptjs";
import randomstring from "randomstring";
import { sendEmail } from "../mailer/mailer";
import { jwtgenerator } from "../helpers/JWT";

//Register

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

//Login

export const login = async (req: Request, res: Response): Promise<void> => {
	const { email, password }: IUser = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(404).json({
				msg: "Mail no encontrado en la base de datos",
			});
			return;
		}

		const validPass = bcryptjs.compareSync(password, user.password);

		if (!validPass) {
			res.status(401).json({
				msg: "Contraseña incorrecta",
			});
			return;
		}

		const token = await jwtgenerator(user.id);

		res.status(202).json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};

//Verified

export const isVerified = async (req: Request, res: Response) => {
	const { email, code } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			res.status(404).json({
				msg: "Mail no encontrado en la base de datos",
			});
			return;
		}

		if (user.verified) {
			res.status(400).json({
				msg: "Usuario ya verificado",
			});
			return;
		}

		if (code !== user.code) {
			res.status(401).json({
				msg: "Código incorrecto",
			});
			return;
		}

		await User.findOneAndUpdate({ email }, { verified: true });

		res.status(200).json({
			msg: "Usuario Verificado",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};
