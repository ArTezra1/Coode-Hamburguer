import ClientesModel from "../models/ClientesSchema.js";
import bcrypt from "bcrypt";
import Services from "../../services/ServicesController.js";

class ClientesController extends Services {
    constructor() {
        super(ClientesModel);
    }

    // Sobrescrevendo o método de criação para tratar senha
    async criar(req, res, next) {
        try {
            const { senha, ...dadosCliente } = req.body;

            if (!senha) {
                return res.status(400).json({ message: "Senha é obrigatória" });
            }

            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);

            const cliente = await this.model.create({ ...dadosCliente, senha: senhaHash });
            return res.status(201).json(cliente);
        } catch (error) {
            console.error("Erro ao criar cliente:", error);
            next(error);
        }
    }
}

export default new ClientesController(); // Exporta como instância
