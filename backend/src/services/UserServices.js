import CrudServices from "./CrudServices.js";
import UserModel from "../models/UserModel.js";

class UserServices extends CrudServices{
    constructor(){
        super(UserModel)
    }
}

export default new UserServices()