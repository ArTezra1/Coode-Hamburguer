import express from "express"
import AddressController from "../controllers/AddressController.js"

const router = express.Router()

router.post("/v1/addresses", AddressController.create)

router.get("/v1/addresses", AddressController.getAll)

router.get("/v1/addresses/query", AddressController.getByParams)

router.get("/v1/addresses/:id", AddressController.getById)

router.put("/v1/addresses/:id", AddressController.update)

router.delete("/v1/addresses", AddressController.delete)

export default router