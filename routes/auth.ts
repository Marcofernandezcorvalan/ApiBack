import { Router } from "express";
import { register } from "../controllers/auth";
import { check } from "express-validator";
import { catchErrors } from "../middlewares/catchErr";
import { existsEmail } from "../helpers/validationsDB";

const router = Router();

router.post(
	"/register",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail,
		check("password", "La contraseña debe ser de 7 caracteres mínimo").isLength({ min: 7 }).not().isEmpty(),
		check("email").custom(existsEmail),
		catchErrors,
	],
	register
);

export default router;
