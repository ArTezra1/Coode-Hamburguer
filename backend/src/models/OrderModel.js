import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    items: [
        {
            productType: {
                type: String,
                enum: ["Burger", "Drink", "Portion", "Combo"],
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: "items.productType"
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            unitPrice:{
                type: Number,
                required: [true, "Insira o preço do item."]
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["recebido", "em preparo", "pronto", "entregue", "cancelado"],
        default: "recebido"
    },
    isDelivery: {
        type: Boolean,
        default: false
    },
    paymentMethod: {
        type: String,
        enum: ["cartão", "dinheiro", "pix"],
        required: [true, "Selecione um método de pagamento."]
    },
    paymentStatus:{
        type: String,
        enum: ["pendente", "pago", "estornado"],
        default: "pendente"
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model("Order", OrderSchema)

export default OrderModel