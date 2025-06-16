import ProductController from "../controllers/ProductController.js";

import express from "express"

import Upload from "../config/multerConfig.js";

const router = express.Router()

router.post("/products", Upload.single("image"), ProductController.createProduct)

router.get("/products", ProductController.getAll)

router.get("/products/:id", ProductController.getById)

router.put("/products/:id", ProductController.update)

router.delete("/products/:id", ProductController.delete)

export default router