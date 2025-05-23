import express from "express"
import AddressController from "../controllers/AddressController.js"

const router = express.Router()

router.post("/addresses", AddressController.create)

router.get("/addresses", AddressController.getAll)

router.get("/addresses/query", AddressController.getByParams)

router.get("/addresses/:id", AddressController.getById)

router.put("/addresses/:id", AddressController.update)

router.delete("/addresses", AddressController.delete)

export default router