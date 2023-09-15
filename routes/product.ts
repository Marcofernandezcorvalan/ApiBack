import { Router } from "express";
import { getData } from "../controllers/product";

const router = Router();

router.get("/products", getData);

export default router;
