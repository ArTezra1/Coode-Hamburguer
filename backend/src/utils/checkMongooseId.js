import mongoose from "mongoose"

import { ErroBadRequest } from "../error/ErrorClasses.js"

export default function checkId(id) {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ErroBadRequest("ID inválido.")
    }
    return id
}