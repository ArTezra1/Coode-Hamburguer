class Controller{
    constructor(serviceModel){
        this.serviceModel = serviceModel
    }

    async listarTodos(req, res, next) {
        try {
            const listaDeRegistros = await this.serviceModel.listarRegistros()
            
            return res.status(200).send(listaDeRegistros)

        } catch (error) {
            next(error)
        }
    }
}