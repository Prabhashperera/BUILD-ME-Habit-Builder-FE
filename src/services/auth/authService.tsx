import axios from "axios";
import api from "../../api/axiosConfig";

interface IUserData {
    userName?: string,
    email: string,
    password: string
}

// Signup User
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


// Login User
export const loginUsers = async (userData: IUserData) => {
    try {
        const response = await api.post("auth/login", userData)
        // console.log(response.data);
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