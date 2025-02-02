import express from "express";
import endereco from "./EnderecosRoutes.js"
import clientes from "./ClientesRoutes.js"
import bebidas from "./BebidasRoutes.js"
import alcool from "./BebidasAlcoolRoutes.js"
import pedidos from "./PedidosRoutes.js"
import lanches from "./LanchesRoutes.js"
import combos from "./CombosRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
  
    app.use([endereco, clientes, bebidas, alcool, pedidos, lanches, combos]);
};

export default routes