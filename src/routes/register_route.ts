import express, { Response, Request, Router } from "express";
import { registerUser } from "../services/register_service";
import { tokenFormater } from "../services/auth_service";

var router: Router = express.Router();

//POST register user
router.post("/api/v1/register", async (req: Request, res: Response) => {
    try {
        const reqBody = req.body;
        const register = await registerUser(reqBody, await tokenFormater(req.headers.authorization));
        res.status(register.status).send(register.body);

    } catch (error) {
        throw error

    }
})

export default router;
