/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../../api/axiosConfig";


export const sleepLogSave = async (logData: any) => {
    try {
        const response = await api.post("/habit/save", logData)
        return response.data
    } catch (err) {
        console.log(err);
    }
}