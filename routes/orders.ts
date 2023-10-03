import { Router } from "express";
import { getOrders } from "../controllers/orders";
import { isJWTvalid } from "../middlewares/isjwtvalid";
import { catchErrors } from "../middlewares/catchErr";

const router = Router();

router.get("/", [isJWTvalid, catchErrors], getOrders);

export default router;
