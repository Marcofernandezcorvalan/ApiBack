import { Router } from "express";
import { homeControler } from "../controllers/home";

const router = Router();

router.get("/", homeControler);

export default router;
