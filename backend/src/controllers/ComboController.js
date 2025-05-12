import ComboServices from "../services/ComboServices.js";

class ComboController{
    constructor(){

    }

    static async create(req, res, next){
        ComboServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        ComboServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        ComboServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        ComboServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        ComboServices.update(req, res, next)
    }

    static async delete(req, res, next){
        ComboServices.delete(req, res, next)
    }
}

export default ComboController