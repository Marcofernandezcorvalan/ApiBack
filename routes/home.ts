import { Router } from "express";
import { homeControler } from "../controllers/home";
import { catchErrors } from "../middlewares/catchErr";

const router = Router();

router.get("/", [catchErrors], homeControler);

export default router;
