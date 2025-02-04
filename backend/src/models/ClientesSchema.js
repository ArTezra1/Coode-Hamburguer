import mongoose from "mongoose";

const ClientesSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "Por favor insira o Nome corretamente!"]
    },
    email: {
        type: String,
        required: [true, "Por favor insira o Email corretamente!"],
        unique: true
    },
    senha: {
        type: String,
        required: [true, "Por favor insira a Senha corretamente!"],
    },
    telefone: {
        type: String,
        default: ""
    },
    endereco: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Enderecos",
            required: [true, "Por favor referencie o Endereço"]
        }
    ],
    role: {
        type: String,
        enum: {
            values: ["cliente", "admin"],
            message: "O tipo de cargo {VALUE} não é permitido."
        }, 
        default: ["cliente"]
    }
}, {
    timestamps: true
})

const ClientesModel = mongoose.model("Clientes", ClientesSchema)

export default ClientesModel