import SalesServices from "../services/SalesServices.js";

class SalesController{
    constructor(){

    }

    static async createSale(req, res, next){
        try {
            const saleData = req.body
            const result = await SalesServices.createSale(saleData)

            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    static async getAll(req, res, next){
        try { 


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