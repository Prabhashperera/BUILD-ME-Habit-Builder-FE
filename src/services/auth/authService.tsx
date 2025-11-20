import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"

interface IUserData {
    userName: string,
    email: string,
    password: string
}

export const signUpUser = async (userData: IUserData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData)
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