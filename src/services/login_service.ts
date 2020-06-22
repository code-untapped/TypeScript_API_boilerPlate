import { userData } from "../controllers/data_controller";
import { UserObject } from "../utils/user_interface"

export const loginService = async (body: { email: String, password: String }) => {
    let accessBool: Boolean = false;

    let res: { status: number, body: String } = {
        status: 202,
        body: ""
    };

    try {
        await userData.map((user: UserObject) => {
            if (body.email === user.email && body.password === user.password) {
                accessBool = true;
                res.body = `Welcome ${user.first_name}`;
            }
        })

        if (!accessBool) {
            res.status = 403;
            res.body = `Access not allowed`
        }

    } catch (error) {
        throw error
    }

    return res
}
