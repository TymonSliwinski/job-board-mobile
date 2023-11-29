import axios from "axios";
import { RegisterUser, UserType } from "../types/User";

const axiosInstance = axios.create({ baseURL: process.env.EXPO_PUBLIC_BACKEND_URL, validateStatus(status) {
    return true;
}});

export default class Auth {
    static login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('auth/login', { email, password });
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            const {
                accessToken,
                refreshToken,
            } = response.data.tokens;
            return { success: true, accessToken, refreshToken, userType: response.data.userType };
        } catch (err) {
            console.log(err);
            return { success: false, error: err}
        }
    };

    static register = async (user: RegisterUser) => {
        const { email, password, userType } = user;
        const data = {
            email,
            password,
            userType,
        };
        if (userType === UserType.DEVELOPER) {
            data['firstName'] = user.firstName;
            data['lastName'] = user.lastName;
            user.avatar && (data['avatar'] = user.avatar);
        } else if (userType === UserType.COMPANY) {
            data['name'] = user.name;
            data['location'] = user.location;
            data['avatar'] = user.avatar;
        }
        try {
            const response = await axiosInstance.post('auth/register', data);
            if (response.status === 201) {
                return true;
            }
            throw new Error(response.data.message);
        } catch (err) {
            console.log(err.message);
            return err.message;
        }
    }

    static refreshToken = async (refreshToken: string) => {
        const config = {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            }
        };
        try {
            const response = await axiosInstance.get('auth/refresh', config);
            const { accessToken, refreshToken } = response.data.tokens;
            return { accessToken, refreshToken };
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    static logout = async () => {
        try {
            const response = await axiosInstance.get('auth/logout');
            if (response.status !== 200) {
                throw new Error(response.data.message);
            }
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}
