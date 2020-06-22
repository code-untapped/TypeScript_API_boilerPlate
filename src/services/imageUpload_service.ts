import fileUpload from "express-fileupload";
fileUpload();

export const imageUpload = async (file, token: String) => {
    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    const uploadPath = "./public/uploads/" + Date.now() + "_" + file.name;

    await file.mv(uploadPath, (err: Error) => {
        if (err) throw err;
    });
}
