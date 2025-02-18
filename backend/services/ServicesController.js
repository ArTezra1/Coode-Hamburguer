import filtrarPedido from "../src/middlewares/FiltrarBusca.js"

class Services {
    constructor(model) {
        this.model = model
    }

    async listar(req, res, next) {
        try {
            const registros = await this.model.find({})

            if (!registros) {
                console.log("Lista de registros vazia.")
            }

            return res.status(200).json(registros)

        } catch (error) {
            console.error("Erro ao listar registros:", error)
            next(error)
        }
    }

    async buscarPorId(req, res, next) {
        try {
            const registro = await this.model.findById(req.params.id)

            if (!registro) {
                return res.status(404).json({ message: "Registro não encontrado." })
            }

            return res.status(200).json(registro)

        } catch (error) {
            console.error("Erro ao buscar registro:", error)
            next(error)
        }
    }

    async criar(req, res, next) {
        try {
            const novoRegistro = await this.model.create(req.body)

            return res.status(201).json({
                message: "Registro criado com sucesso.",
                registro: novoRegistro
            })

        } catch (error) {
            console.error("Erro ao criar registro:", error)
            next(error)
        }
    }

    async atualizar(req, res, next) {
        try {
            const registroAtualizado = await this.model.findByIdAndUpdate(req.params.id, req.body)

            if (!registroAtualizado) {
                return res.status(404).json({ message: "Registro não encontrado." })
            }

            return res.status(200).json({
                message: "Registro Atualizado.",
                registroAtualizado: registroAtualizado
            })

        } catch (error) {
            console.error("Erro ao atualizar registro:", error)
            next(error)
        }
    }

    async deletar(req, res, next) {
        try {
            const registroDeletado = await this.model.findByIdAndDelete(req.params.id)

            if (!registroDeletado) {
                return res.status(404).json({ message: "Registro não encontrado." })
            }

            return res.status(200).json({ message: "Registro deletado com sucesso." })

        } catch (error) {
            console.error("Erro ao deletar registro:", error)
            next(error)
        }
    }

    async listarPorFiltro(req, res, next) {
        try {
            const busca = await filtrarPedido(this.model, req.query)

            const pedidoResultado = await this.model.find(busca)

            if (pedidoResultado !== null) {
                return await res.status(200).send(pedidoResultado)

            } else {
                res.status(200).send([])
            }

        } catch (error) {
            next(error)
            console.error("erro porra", error)
        }
    }

}

export default Services