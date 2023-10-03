import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orders";
import { isJWTvalid } from "../middlewares/isjwtvalid";
import { catchErrors } from "../middlewares/catchErr";
import { validateVerified } from "../middlewares/validateverified";
import { check } from "express-validator";

const router = Router();

router.get("/", [isJWTvalid, catchErrors], getOrders);

router.post(
	"/",
	[
		isJWTvalid,
		validateVerified,
		check("price", "El precio es obligatorio").not().isEmpty(),
		check("total", "El total es obligatorio").not().isEmpty(),
		check("shippingDetails", "Los detalles de envío son obligatorios").not().isEmpty(),
		check("items", "El array de productos es obligatorio").not().isEmpty(),
		catchErrors,
	],
	createOrder
);

export default router;
