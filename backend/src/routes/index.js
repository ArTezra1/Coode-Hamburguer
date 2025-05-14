import user from "./UserRoutes.js"
import burger from "./BurguerRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Teste api"));
  
    app.use(user, burger);
};

export default routes