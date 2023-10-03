import { Router } from "express";
import { getData } from "../controllers/product";
import { catchErrors } from "../middlewares/catchErr";

const router = Router();

router.get("/", [catchErrors], getData);

export default router;
