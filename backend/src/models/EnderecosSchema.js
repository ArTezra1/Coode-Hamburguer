import mongoose from "mongoose";

const EnderecosSchema = new mongoose.Schema({
    clienteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clientes",
        required: [true, "Por favor referencie o cliente!"]
    },
    cep: {
        type: String,
        required: [true, "Por favor preencha o CEP corretamente!"]
    },
    bairro: {
        type: String,
        required: [true, "Por favor preencha o Bairro corretamente!"],
    },
    rua: {
        type: String,
        required: [true, "Por favor preencha a Rua corretamente!"]
    },
    numero: {
        type: Number,
        required: [true, "Por favor preencha o Número corretamente!"]
    },
    complemento: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const EnderecosModel = mongoose.model("Enderecos", EnderecosSchema)

export default EnderecosModel