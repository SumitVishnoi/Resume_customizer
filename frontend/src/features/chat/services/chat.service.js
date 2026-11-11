import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export const message = async(formData)=> {
    const response = await api.post("/api/chat/message", formData)
    return response.data
}