import CrudServices from "./CrudServices.js";
import OrderModel from "../models/OrderModel.js";

class OrderServices extends CrudServices{
    constructor(){
        super(OrderModel)
    }
}

export default new OrderServices()