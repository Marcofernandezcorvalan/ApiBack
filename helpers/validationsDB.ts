import { sendEmail } from "../mailer/mailer";
import User, { IUser } from "../models/users";

export const existsEmail = async (email: string): Promise<void> => {
	const existsEmail: IUser | null = await User.findOne({ email });

	if (existsEmail && existsEmail.verified) {
		throw new Error(`'${email}' ya está registrado`);
	}

	if (existsEmail && !existsEmail.verified) {
		await sendEmail(email, existsEmail.code as string);
		throw new Error(`Usuario ya registrado. Código de verificación enviado nuevamente a '${email}'`);
	}
};
