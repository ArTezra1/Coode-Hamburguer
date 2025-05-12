import DrinkServices from "../services/DrinkServices.js";

class DrinkController{
    constructor(){

    }

    static async create(req, res, next){
        DrinkServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        DrinkServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        DrinkServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        DrinkServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        DrinkServices.update(req, res, next)
    }

    static async delete(req, res, next){
        DrinkServices.delete(req, res, next)
    }
}

export default DrinkController