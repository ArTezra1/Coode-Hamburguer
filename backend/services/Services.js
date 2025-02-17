class Services{
    constructor(model){
        this.model = model
    }

    async listarRegistros() {
        return data[this.model].find()
    }
}

export default Services