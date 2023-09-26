import jwt from "jsonwebtoken";

export const jwtgenerator = (id: string = ""): Promise<string> => {
	return new Promise((res, rej) => {
		const payload = { id };

		jwt.sign(
			payload,
			process.env.PASS as string,
			{
				expiresIn: "7h",
			},
			(err: Error | null, token: string | undefined) => {
				if (err) {
					console.log(err);
					rej("No se pudo generar el JWT");
				} else {
					res(token as string);
				}
			}
		);
	});
};
