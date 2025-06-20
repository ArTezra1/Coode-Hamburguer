import { it, test, describe, expect } from "vitest"

import { 
    validateCategories,
    validateImage, 
    validateName,
    validatePrice,
    validateQuantity 
} from "../../../src/utils/validateProducts"

import { ErroBadRequest } from "../../../src/error/ErrorClasses"

describe("Testando a função validateCategories", () => {
    test("Deve lançar o ErroBadRequest se a categoria não for válida", ()=>{
        const categoryMock = "Fries"

        expect(() => validateCategories(categoryMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar o erro Categoria Inválida se a categoria não for válida", ()=>{
        const categoryMock = "Fries"

        expect(() => validateCategories(categoryMock)).toThrow("Categoria inválida")
    })
})

describe("Testando a função validateImage", ()=>{
    test("Deve lançar o ErroBadRequest se a imagem não for válida", ()=>{
        const imageMock = {
            file: "pep.png",
            fileName: "pep.png"
        }

        expect(() => validateImage(imageMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar o erro imagem é obrigatória se não receber uma imagem", ()=>{
        const imageMock = {}

        expect(() => validateImage(imageMock)).toThrow("Imagem é obrigatória")
    })
})

describe("Testando a função validateName", ()=>{
    test("Deve lançar o ErroBadRequest se o nome não for válido", ()=>{
        const nameMock = ""

        expect(() => validateName(nameMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar a mensagem de erro caso o nome não tenha 3 caracteres", ()=>{
        const nameMock = "e"

        expect(() => validateName(nameMock)).toThrow("Nome é obrigatório e deve ter pelo menos 3 caracteres.")
    })

    test("Deve lançar a mensagem de erro caso o nome não for uma string", ()=>{
        const nameMock = 4

        expect(() => validateName(nameMock)).toThrow("Nome é obrigatório e deve ter pelo menos 3 caracteres.")
    })
})

describe("Testanto a função validatePrice", ()=>{
    test("Deve lançar o ErroBadRequest se o preço não for válido", ()=>{
        const priceMock = -1

        expect(() => validatePrice(priceMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar a mensagem de erro caso o preço não seja um número ou seja menor do que 1", ()=>{
        const priceMock = ""

        expect(() => validatePrice(priceMock)).toThrow("Preço é obrigatório e deve ser maior que zero.")
    })
})

describe("Testando a função validateQuantity", ()=>{
    test("Deve lançar o ErroBadRequest se a quantidade não for válida", ()=>{
        const quantityMock = -1

        expect(() => validateQuantity(quantityMock)).toThrowError(ErroBadRequest)
    })

    test("Deve lançar a mensagem de erro caso a quantidade não seja um número ou seja menor do que 0", ()=>{
        const quantityMock = ""

        expect(() => validateQuantity(quantityMock)).toThrow("Quantidade é obrigatória e deve ser maior ou igual a zero.")
    })
})
