import SalesServices from "../services/SalesServices.js";

class SalesController{
    constructor(){

    }

    static async createSale(req, res, next){
        try {
            const result = await SalesServices.createSale()

            res.status(201).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getAllOrByGroup(req, res, next){
        try { 
            const { group } = req.query

            if(group){
                const result = await SalesServices.getByGroups(group)
                
                return res.status(200).json(result)
            }

            const result = await SalesServices.getAll()

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async getByGroup(req, res, next){
        try {
            const { group } = req.query

            const result = await SalesServices.getByGroups(group)

            res.status(200).json(result)
            
        } catch (error) {
            next(error)
        }
    }

    static async getById(req, res, next){
        try { 
            const { id } = req.params

            const result = await SalesServices.getById(id)

            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try { 
            const { id } = req.params
            const data = req.body

            await SalesServices.update(id, data)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next){
        try { 
            const { id } = req.params

            await SalesServices.delete(id)

            return res.status(200).send()

        } catch (error) {
            next(error)
        }
    }
}

export default SalesController