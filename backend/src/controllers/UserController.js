import UserServices from "../services/UserServices.js";

class UserController{
    constructor(){

    }

    static async create(req, res, next){
        UserServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        UserServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        UserServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        UserServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        UserServices.update(req, res, next)
    }

    static async delete(req, res, next){
        UserServices.delete(req, res, next)
    }
}

export default UserController