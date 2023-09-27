import { Router } from "express";
import { isVerified, login, register } from "../controllers/auth";
import { check } from "express-validator";
import { catchErrors } from "../middlewares/catchErr";
import { existsEmail } from "../helpers/validationsDB";
import { getData } from "../controllers/product";

const router = Router();

//Register

router.post(
	"/register",
	[
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("email", "El email es obligatorio").isEmail(),
		check("password", "La contraseña debe ser de 7 caracteres mínimo").isLength({ min: 7 }).not().isEmpty(),
		check("email").custom(existsEmail),
		catchErrors,
	],
	register
);

//Register

router.get("/products", getData);

//Login

router.post(
	"/login",
	[
		check("email", "Mail obligatorio").not().isEmpty(),
		check("email", "Mail no válido").isEmail(),
		check("password", "Contraseña Obligatoria").not().isEmpty(),
		check("password", "La contraseña debe ser de 7 caracteres mínimo").isLength({ min: 7 }),
		catchErrors,
	],
	login
);

//Verified

router.patch(
	"/verified",
	[
		// check("email", "Mail obligatorio").not().isEmpty(),
		// check("email", "Mail no válido").isEmail(),
		check("code", "El código es Obligatorio").not().isEmpty(),
		catchErrors,
	],
	isVerified
);

export default router;
