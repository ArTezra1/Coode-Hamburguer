import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, path.resolve("images/"))
    },
    filename: (req, file, callback)=>{
        const time = new Date().getDate()

        callback(null, `${time}_${file.originalname}`)
    }
})

const Upload = multer({
    storage: storage
})

export default Upload