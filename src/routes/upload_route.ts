import express,  { Response, Request, Router } from "express";
import { tokenFormater } from "../services/auth_service";
import { imageUpload } from "../services/imageUpload_service";
import { FileArray, UploadedFile } from "express-fileupload";

var router = express.Router();

router.post("/api/v1/image/upload", async(req: Request, res: Response) => {
    if (!req.files.file) {
        res.status(204).send("Sorry no image");
    }

    var file = req.files.file;

    try {
        await imageUpload(file, await tokenFormater(req.headers.authorization));
        res.status(200).send(`Image ${file.name} has been uploaded`);

    } catch (error) {
        throw error
    }

});

export default router;
