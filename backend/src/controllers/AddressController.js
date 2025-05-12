import AddressServices from "../services/AddressServices.js";

class AddressController{
    constructor(){

    }

    static async create(req, res, next){
        AddressServices.create(req, res, next)
    }

    static async getAll(req, res, next){
        AddressServices.getAll(req, res, next)
    }

    static async getById(req, res, next){
        AddressServices.getById(req, res, next)
    }

    static async getByParams(req, res, next){
        AddressServices.getByParams(req, res, next)
    }

    static async update(req, res, next){
        AddressServices.update(req, res, next)
    }

    static async delete(req, res, next){
        AddressServices.delete(req, res, next)
    }
}

export default AddressController