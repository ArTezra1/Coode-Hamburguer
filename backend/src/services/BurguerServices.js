import CrudServices from "./CrudServices.js";
import BurguerModel from "../models/BurguerModel.js";

import {
    ErroBadRequest,
    ErroNotFound
} from "../error/ErrorClasses.js";
import mongoose from "mongoose";

class BurguerServices extends CrudServices {
    constructor() {
        super(BurguerModel)
    }

    async getIngredients(id) {
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            throw new ErroBadRequest("ID inválido.")
        }

        const data = await BurguerModel.findById(id).populate("ingredients")

        if (!data) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return data.ingredients
    }
}

export default new BurguerServices()