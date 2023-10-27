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
		// check("price", "El price es obligatorio").not().isEmpty(),
		check("total", "El total es obligatorio").not().isEmpty(),
		check("shippingDetails", "Los shippingDetails son obligatorios").not().isEmpty(),
		check("shippingDetails.name", "El name es obligatorio").not().isEmpty(),
		check("shippingDetails.cellphone", "El cellphone es obligatorio").not().isEmpty(),
		check("shippingDetails.location", "La location es obligatorio").not().isEmpty(),
		check("shippingDetails.address", "El address es obligatorio").not().isEmpty(),
		check("items", "El array de productos es obligatorio").not().isEmpty(),
		check("items.*.img", "La img es obligatoria").not().isEmpty(),
		check("items.*.name", "El name es obligatorio").not().isEmpty(),
		check("items.*.quantity", "El quantity es obligatoria").not().isEmpty(),
		check("items.*.price", "El price es obligatoria").not().isEmpty(),
		check("items.*.id", "El id es obligatoria").not().isEmpty(),
		catchErrors,
	],
	createOrder
);

export default router;
