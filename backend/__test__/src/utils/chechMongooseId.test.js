import { test, it, expect, describe } from "vitest"

import checkId from "../../../src/utils/checkMongooseId"

import { ErroBadRequest } from "../../../src/error/ErrorClasses"

describe("Testando a função que checa o id do mongoose", () => {
    test("Deve lançar um ErroBadRequest se o id não for válido", () => {
        const idMock = "aonsownd123%"

        expect(() => checkId(idMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar o erro ID inválido se o id não for válido", () => {
        const idMock = "aonsownd123%"

        expect(() => checkId(idMock)).toThrow("ID inválido.")
    })

    test("Deve retornar o id se o id for válido", () => {
        const idMock = "685330b8c9e77db3f24913a7"

        const result = checkId(idMock)

        expect(result).toEqual(idMock)
    })
})
