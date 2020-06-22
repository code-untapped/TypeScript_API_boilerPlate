import { userData, writeToFile } from "../controllers/data_controller";
import { isAdmin, tokenFormater } from "./auth_service";
import { UserObject } from "../utils/user_interface";

export const updateUserDetails = async (userDetails: UserObject, token: String) => {
    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    let updatedUser = {
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: ""
    };

    if (await isAdmin(token) === true) {
        try {
            userData.map((user: { email: String, password: String, first_name: String,
                last_name: String, gender: String
            }) => {
                if (userDetails.email === user.email && userDetails.password === user.password) {

                    Object.keys(updatedUser).map((detail) => {
                        if (userDetails.hasOwnProperty(detail )) {
                            updatedUser[detail] = userDetails[detail];
                        }
                    });

                    user.first_name = updatedUser.first_name;
                    user.last_name = updatedUser.last_name;
                    user.email = updatedUser.email;
                    user.gender = updatedUser.gender;
                    user.password = updatedUser.password;
                }
            });

            return await writeToFile(userData);

        } catch (error) {
            throw error
        }

    } else {
        return {
            status: 403,
            body: "Not admin"
        }
    };
}

export const deleteUser = async (userToDelete: UserObject, token: String) => {

    if (!token || token.length === 0) return {
        status: 403,
        body: "No token"
    }

    if (await isAdmin(token) === true) {
        try {
            userData.map((user: UserObject, idx: Int32Array) => {
                if (userToDelete.email === user.email && userToDelete.password === user.password) {
                    userData.splice(idx, 1);
                }
            });

            const updateData = await writeToFile(userData);
            if (updateData.status === 201) return {
                status: 201,
                body: `User removed ${userToDelete.first_name} ${userToDelete.last_name}`
            }

        } catch (error) {
            throw error
        }

    } else return {
        status: 403,
        body: "Not admin"
    }
}
