import mongoose from "mongoose";

const ImagensSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Por favor insira o nome da imagem."]
    },
    src:{
        type: String,
        required: [true, "Por favor insira o caminho da imagem."]
    },
    alt:{
        type: String,
    },
    product:{
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
    }
},{

})

const ImagensModel = mongoose.model("Imagens", ImagensSchema)

export default ImagensModel