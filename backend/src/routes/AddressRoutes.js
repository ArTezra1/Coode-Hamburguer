import AddressController from "../controllers/AddressController.js"
import express from "express"

import paginate from "../middlewares/Paginate.js"

const router = express.Router()

router.post("/addresses", AddressController.create)

router.get("/addresses", AddressController.getAll, paginate)

router.get("/addresses/:id", AddressController.getById)

router.put("/addresses/:id", AddressController.update)

router.delete("/addresses/:id", AddressController.delete)

export default router