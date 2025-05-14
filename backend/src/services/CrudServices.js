import mongoose from "mongoose"
import filterRequest from "../middlewares/FilterRequest.js"

class CrudServices {
    constructor(model) {
        this.model = model
    }

    async create(data) {
        return await this.model.create(data)
    }

    async getAll() {
        return await this.model.find({})
    }

    async getById(id) {
        if(!id || !mongoose.Types.ObjectId.isValid(id)) return null

        return await this.model.findById(id)
    }

    async getByParams(params) {
        
    }

    async update(id, data) {
        if(!id || !mongoose.Types.ObjectId.isValid(id)) return null

        return await this.model.findByIdAndUpdate(id, data, { new: true })
    }

    async delete(id) {
        if(!id || !mongoose.Types.ObjectId.isValid(id)) return null

        return await this.model.findByIdAndDelete(id)
    }
}

export default CrudServices