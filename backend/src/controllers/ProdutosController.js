import Services from "../../services/ServicesController.js"
import ProdutosModel from "../models/ProdutosSchema.js"
import LanchesModel from "../models/LanchesSchema.js"
import BebidasModel from "../models/BebidasSchema.js"
import BebidasAlcoolModel from "../models/BebidasAlcoolSchema.js"
import CombosModel from "../models/CombosSchema.js"

class ProdutosController extends Services {
    constructor() {
        super(ProdutosModel)
    }

    async listarMercadorias(req, res, next) {
        try {
            const [lanches, bebidas, bebidasAlcool, combos] = await Promise.all([
                LanchesModel.find(),
                BebidasModel.find(),
                BebidasAlcoolModel.find(),
                CombosModel.find()    
            ])

            res.status(200).json({
                lanches,
                bebidas,
                bebidasAlcool,
                combos
            })
        } catch (error) {
            next(error)
        }

    }
}

export default new ProdutosController()