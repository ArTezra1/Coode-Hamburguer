import express from "express"
import UserControler from "../controllers/UserController.js"

import CheckAdmin from "../middlewares/CheckAdmin.js"
import CheckToken from "../middlewares/CheckToken.js"

const router = express.Router()

router.post("/v1/login", UserControler.login)

router.get("/v1/users", CheckToken, CheckAdmin,UserControler.getAll)

router.get("/v1/users/query", CheckToken, CheckAdmin,UserControler.getByParams)

router.get("/v1/users/:id", CheckToken, CheckAdmin, UserControler.getById)

router.get("/v1/profile/orders", CheckToken, UserControler.getOrders)

router.get("/v1/profile/address", CheckToken, UserControler.getAddress)

router.put("/v1/profile/address", CheckToken, UserControler.updateAddress)

router.delete("/v1/profile/delete", UserControler.delete)

export default router