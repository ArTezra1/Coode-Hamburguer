import CrudServices from "./CrudServices.js";
import BurgerModel from "../models/BurgerModel.js";
import checkId from "../utils/checkMongooseId.js";

import {
    ErroNotFound,
} from "../error/ErrorClasses.js";

class BurgerServices extends CrudServices {
    constructor() {
        super(BurgerModel)
    }

    async getIngredients(id) {
        const validId = checkId(id)

        const data = await BurgerModel.findById(validId).populate("ingredients")

        if (!data) {
            throw new ErroNotFound("Registro não encontrado.")
        }

        return data.ingredients
    }
}

export default new BurgerServices()