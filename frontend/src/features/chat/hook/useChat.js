import { message } from "../services/chat.service"


const useChat = ()=> {
    const handleMessage = async(formData) => {
        const data = await message(formData)
        return data
    }
    return {
        handleMessage
    }
}

export default useChat