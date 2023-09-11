import User, { IUser } from "../models/users";

export const existsEmail = async (email: string): Promise<void> => {
	const existsEmail: IUser | null = await User.findOne({ email });

	if (existsEmail) {
		throw new Error(`'${email}' ya está registrado`);
	}
};
