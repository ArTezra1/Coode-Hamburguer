import CrudServices from "./CrudServices.js";
import DrinkModel from "../models/DrinkModel.js";

class DrinkServices extends CrudServices{
    constructor(){
        super(DrinkModel)
    }
}

export default new DrinkServices()