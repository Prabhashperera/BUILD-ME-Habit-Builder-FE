/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import api from "../../api/axiosConfig";


export const sleepLogSave = async (logData: any) => {
    try {
        const token = localStorage.getItem("accessToken")
        const response = await api.post("/habit/save", logData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return response.data
    } catch (err: any) {
        const message = err.response?.data?.message || err.message || "Unknown Error";
        toast.error(`Failed to save sleep log: ${message}`);
        throw new Error(message);
    }
}