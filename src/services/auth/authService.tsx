import axios from "axios";
import api from "../../api/axiosConfig";

interface IUserData {
    userName: string,
    email: string,
    password: string
}

export const signUpUser = async (userData: IUserData) => {
    try {
        const response = await api.post("auth/signup", userData)
        return response.data

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data || { message: error.message };
        }
        if (error instanceof Error) {
            throw { message: error.message };
        }
        throw { message: String(error) };
    }
}