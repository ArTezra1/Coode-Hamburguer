import PortionServices from "../services/PortionServices.js";

class PortionController{
    constructor(){

    }

    static async create(req, res, next){
        PortionServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        PortionServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        PortionServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        PortionServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        PortionServices.update(req, res, next)
    }

    static async delete(req, res, next){
        PortionServices.delete(req, res, next)
    }
}

export default PortionController