import express from "express"
import PortionController from "../controllers/PortionController.js"

const router = express.Router()

router.post("/v1/products/portions", PortionController.create)

router.get("/v1/products/portions", PortionController.getAll)

router.get("/v1/products/portions/query", PortionController.getByParams)

router.get("/v1/products/portions/:id", PortionController.getById)

router.put("/v1/products/portions/:id", PortionController.update)

router.post("/v1/products/portions/:id", PortionController.delete)

export default router