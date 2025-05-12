import BurguerServices from "../services/BurguerServices.js";

class BurguerController{
    constructor(){

    }

    static async create(req, res, next){
        BurguerServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        BurguerServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        BurguerServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        BurguerServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        BurguerServices.update(req, res, next)
    }

    static async delete(req, res, next){
        BurguerServices.delete(req, res, next)
    }
}

export default BurguerController