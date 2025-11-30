/* eslint-disable @typescript-eslint/no-explicit-any */
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
    } catch (err) {
        console.log(err);
    }
}