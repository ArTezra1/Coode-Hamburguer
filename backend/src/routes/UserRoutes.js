import express from "express"
import UserControler from "../controllers/UserController.js"

import CheckAdmin from "../middlewares/CheckAdmin.js"
import CheckToken from "../middlewares/CheckToken.js"

const router = express.Router()

router.post("/login", UserControler.login)

router.get("/users", CheckToken, CheckAdmin, UserControler.getAll)

router.get("/users/:id", CheckToken, UserControler.getById)

router.get("/users/:id/orders", CheckToken, UserControler.getOrders)

router.get("/users/:id/address", CheckToken, UserControler.getAddress)

router.put("/users/:id/address", CheckToken, UserControler.updateAddress)

router.delete("/users/:id", UserControler.delete)

export default router