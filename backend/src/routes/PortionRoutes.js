import express from "express"
import PortionController from "../controllers/PortionController.js"

import Upload from "../config/multerConfig.js"

const router = express.Router()

router.post("/products/portions", Upload.single("image"), PortionController.create)

router.get("/products/portions", PortionController.getAll)

router.get("/products/portions/query", PortionController.getByParams)

router.get("/products/portions/:id", PortionController.getById)

router.put("/products/portions/:id", PortionController.update)

router.post("/products/portions/:id", PortionController.delete)

export default router