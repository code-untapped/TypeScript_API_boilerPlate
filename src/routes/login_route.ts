import express, { Router, Request, Response } from "express";
import { loginService } from "../services/login_service";

var router: Router = express.Router();

//POST user login
router.post("/api/v1/login", async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const login = await loginService(reqBody);
        res.status(login.status).send(login.body);

    } catch (error) {
        throw error

    }
})

export default router;
