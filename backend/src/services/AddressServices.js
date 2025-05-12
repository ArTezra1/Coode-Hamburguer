import CrudServices from "./CrudServices.js";
import AddresModel from "../models/AddressModel.js";

class AddresServices extends CrudServices{
    constructor(){
        super(AddresModel)
    }


}

export default new AddresServices()