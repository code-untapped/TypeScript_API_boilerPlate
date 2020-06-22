import { userData } from "../controllers/data_controller";
import {UserObject} from "../utils/user_interface";

export const isAdmin = async(token: String ) => {
    var admin: Boolean = false;

    await userData.map((user: UserObject) => {
        if (user.token === token && user.admin === true) {
            admin = true;
        }
    });
    return admin
};

export const tokenFormater = async(token: String) => {
    return token.replace("Bearer ", "")
};
