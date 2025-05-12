import OrderServices from "../services/OrderServices.js";

class OrderController{
    constructor(){

    }

    static async create(req, res, next){
        OrderServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        OrderServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        OrderServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        OrderServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        OrderServices.update(req, res, next)
    }

    static async delete(req, res, next){
        OrderServices.delete(req, res, next)
    }
}

export default OrderController