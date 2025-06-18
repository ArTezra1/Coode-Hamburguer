import CrudServices from "./CrudServices.js";
import OrderModel from "../models/OrderModel.js";

import {
    ErroBadRequest,
    ErroNotFound
} from "../error/ErrorClasses.js";
import ProductModel from "../models/ProductModel.js";

class OrderServices extends CrudServices {
    constructor() {
        super(OrderModel)
    }

    async createOrder({ customer, address, items, isDelivery, paymentMethod, paymentStatus }) {
        if (!items || items.length === 0) {
            throw new ErroBadRequest("O pedido deve conter pelo menos um item.")
        }

        const populatedItems = []

        let totalPrice = 0

        for (const item of items) {
            const { category, product: productId, quantity } = item

            const product = await ProductModel.findById(productId)
            
            if (!product) {
                throw new ErroNotFound(`Produto não encontrado para o ID: ${productId}`)
            }

            const unitPrice = product.price

            const itemTotal = unitPrice * quantity
            totalPrice += itemTotal

            populatedItems.push({
                product: productId,
                category,
                quantity,
                unitPrice,
            })
        }

        const newOrder = await OrderModel.create({
            customer,
            address,
            items: populatedItems,
            totalPrice,
            isDelivery,
            paymentMethod,
            paymentStatus: paymentStatus || "pendente"
        })

        return newOrder

    }

    async getAllOrders(){
        const orders = await OrderModel.find({})
        .select("-__v -updatedAt")
        .populate({
            path: "items.product", 
            select: "name quantity -_id"
        })
        // .populate("customer", "name email")
        .populate("address", "street city state zipCode")
        
        return orders
    }
}

export default new OrderServices()