import user from "./UserRoutes.js"
import address from "./AddressRoutes.js"
import burger from "./BurgerRoutes.js"
import drink from "./DrinkRoutes.js"
import portion from "./PortionRoutes.js"
import combo from "./ComboRoutes.js"
import order from "./OrderRoutes.js"

const routes = (app) => {
    app.use(user, address, burger, drink, portion, combo, order)
};

export default routes