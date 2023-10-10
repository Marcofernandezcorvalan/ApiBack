import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "fernandezcmarco7@gmail.com",
		pass: PASS,
	},
	from: "fernandezcmarco7@gmail.com",
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
	const mailOpt = {
		from: '"Nvidia" fernandezcmarco7@gmail.com',
		to,
		subject: "Código de Verificación Nvidia",
		text: `
        	Su código de verificación Nvidia.
        	Code: ${code}
        `,
	};

	try {
		await transporter.sendMail(mailOpt);
		console.log("Mail Enviado");
	} catch (error) {
		console.error("Error al enviar el Mail:", error);
	}
};
