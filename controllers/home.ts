import { Request, Response } from "express";
import path from "path";

export const homeControler = (req: Request, res: Response) => {
	res.sendFile(path.resolve("index.html"));
};
