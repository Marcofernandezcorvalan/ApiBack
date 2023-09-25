import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "marcofernandezc@outlook.com",
		pass: "jqjsdzegtlpnahxn",
	},
	from: "marcofernandezc@outlook.com",
});

export const sendEmail = async (to: string, code: string): Promise<void> => {
	const mailOpt = {
		from: '"Nvidia" marcofernandezc@outlook.com',
		to,
		subject: "Código de Validación Nvidia",
		text: `
            Código de verificación de Nvidia.
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
