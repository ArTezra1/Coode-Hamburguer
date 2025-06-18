import ProductController from "../controllers/ProductController.js";
import express from "express"

import paginate from "../middlewares/Paginate.js";

import Upload from "../config/multerConfig.js";

const router = express.Router()

router.post("/products", Upload.single("image"), ProductController.createProduct)

router.get("/products", ProductController.getAll, paginate)

router.get("/products/:id", ProductController.getById)

router.put("/products/:id", ProductController.update)

router.delete("/products", ProductController.deleteAll)

router.delete("/products/:id", ProductController.delete)

export default router