import ClientesModel from "../models/ClientesSchema.js";
import bcrypt from "bcrypt";
import Services from "../../services/ServicesController.js"
import jwt from "jsonwebtoken"


class ClientesController extends Services {
    constructor() {
        super(ClientesModel)
    }

    async criar(req, res, next) {
        try {
            const { senha, ...dadosCliente } = req.body

            if (!senha) {
                return res.status(400).json({ message: "Senha é obrigatória." })
            }

            const salt = await bcrypt.genSalt(10)
            const senhaHash = await bcrypt.hash(senha, salt)

            const cliente = await this.model.create({ ...dadosCliente, senha: senhaHash })

            return res.status(201).json(cliente)

        } catch (error) {
            console.error("Erro ao criar cliente:", error)
            next(error)
        }
    }

    async login(req, res, next) {
        try {
            const { email, senha } = req.body
    
            if(email && senha){
                const usuario = await ClientesModel.findOne({ email: email })
                
                if(!usuario){
                    return res.status(401).json({
                        message: "Email invalido."
                    })
                }
    
                const senhaValida = bcrypt.compare(senha, usuario.senha)
    
                if(!senhaValida){
                    return res.status(401).json({
                        message: "Senha invalida."
                    })
                }
    
                const token = jwt.sign(
                    { id: usuario._id, role: usuario.role },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "1h" }
                )
    
                return res.json({token})
    
            } else{
                return res.status(422).json({
                    message: "Por favor preencha os campos corretamente."
                })
            }
    
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}

export default new ClientesController()
