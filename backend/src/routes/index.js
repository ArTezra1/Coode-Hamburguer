import express from "express"
import path from "path"

import user from "./UserRoutes.js"
import address from "./AddressRoutes.js"
import product from "./ProductRoutes.js"
import order from "./OrderRoutes.js"
import sales from "./SalesRoutes.js"
import salesSummary from "./SalesSummaryRoutes.js"

const routes = (app) => {
    app.use("/v1", user, address, order, sales, salesSummary, product)
    app.use("/images", express.static(path.join(process.cwd(), "uploads/images")))
};

export default routes