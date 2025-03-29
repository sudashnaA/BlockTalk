import axios from "axios";
import { JsonWebToken, LoginUser, RegisterUser, User, passportUser } from "../types";
import { apiBaseUrl } from "../constants";

const login = async (user: LoginUser) => {
    const { data } = await axios.post<JsonWebToken>(`${apiBaseUrl}/users/login`, user);
    return data;
};

const register = async (user: RegisterUser) => {
    const { data } = await axios.post<User>(`${apiBaseUrl}/users/register`, user);
    return data;
};

const verify = async () => {
    const { data } = await axios.get<passportUser>(`${apiBaseUrl}/users/verify`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
}

export default {
    login,
    register,
    verify
}