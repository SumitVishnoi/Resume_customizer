

export const sendMessage = async (req, res)=> {
    console.log(req.file)
    if(!req.file) {
        return res.status(400).json({
            success: false,
            message: "file is required"
        })
    }

    const file = req.file
    const fileName = file.originalname
}