import express from "express"
import UserControler from "../controllers/UserController.js"

import CheckAdmin from "../middlewares/CheckAdmin.js"
import CheckToken from "../middlewares/CheckToken.js"

const router = express.Router()

router.post("/login", UserControler.login)

router.get("/users", CheckToken, CheckAdmin, UserControler.getAll)

router.get("/users/:id", CheckToken, UserControler.getById)

router.get("/profile/orders", CheckToken, UserControler.getOrders)

router.get("/profile/address", CheckToken, UserControler.getAddress)

router.put("/profile/address", CheckToken, UserControler.updateAddress)

router.delete("/profile", UserControler.delete)

export default router