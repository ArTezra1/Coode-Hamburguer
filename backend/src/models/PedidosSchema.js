import mongoose, { mongo } from "mongoose";

const PedidosSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes"
    },
    enderecoId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Enderecos"
    },
    items: [
        {
            produtoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Enderecos",
                required: true
            },
            bebidaId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Bebidas"
            },
            bebidasAlcoolId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "BebidasAlcool"
            },
            combosId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Combos"
            },
            nome: {
                type: String,
                required: true
            },
            quantidade: {
                type: Number,
                required: true,
                min: 1
            },
            preco_unitario: {
                type: Number,
                required: true
            }
        }
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Recebido", "Em preparo", "Pronto", "Saiu para a Entrega", "Entregue"],
        default: "Recebido"
    }
}, {
    timestamps: true
})

const PedidosModel = mongoose.model("Pedidos", PedidosSchema)

export default PedidosModel