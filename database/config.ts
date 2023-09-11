import mongoose from "mongoose";

export const dbConect = async (): Promise<void> => {
	try {
		const dbUrl = process.env.DB_URL;
		if (!dbUrl) {
			throw new Error("URL no definida en '.env'");
		}

		await mongoose.connect(dbUrl);
	} catch (err) {
		console.log(err);
		throw new Error("Error a iniciar la DataBase");
	}
};
