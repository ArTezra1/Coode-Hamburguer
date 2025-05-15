import CrudServices from "./CrudServices.js";
import BurgerModel from "../models/BurgerModel.js";

import {
    ErroBadRequest,
    ErroNotFound,
} from "../error/ErrorClasses.js";
import mongoose from "mongoose";

class BurgerServices extends CrudServices {
    constructor() {
        super(BurgerModel)
    }

    async getIngredients(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new ErroBadRequest("ID inválido.")
        }

        const data = await BurgerModel.findById(id).populate("ingredients")

        if (!data) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return data.ingredients
    }
}

export default new BurgerServices()