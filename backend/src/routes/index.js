import user from "./UserRoutes.js"
import address from "./AddressRoutes.js"
import burger from "./BurgerRoutes.js"
import drink from "./DrinkRoutes.js"
import portion from "./PortionRoutes.js"
import combo from "./ComboRoutes.js"
import order from "./OrderRoutes.js"
import sales from "./SalesRoutes.js"
import salesSummary from "./SalesSummaryRoutes.js"

const routes = (app) => {
    app.use("/v1", user, address, burger, drink, portion, combo, order, sales, salesSummary)
};

export default routes