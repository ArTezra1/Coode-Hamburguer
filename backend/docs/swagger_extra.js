const swaggerExtra = {
  "/v1/products/burgers": {
    post: {
      tags: ["Hambúrgueres"],
      description: "Cria um novo hambúrguer no catálogo de produtos.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                ingredients: {
                  type: "array",
                  items: { type: "string" }
                },
                description: { type: "string" },
                imageSrc: { type: "string" },
                quantity: { type: "number" }
              },
              required: ["name", "price", "ingredients", "description", "imageSrc", "quantity"]
            }
          }
        }
      },
      responses: {
        201: { description: "Hambúrguer criado com sucesso." },
        400: { description: "Requisição inválida." },
        500: { description: "Erro interno do servidor." }
      }
    },
    get: {
      tags: ["Hambúrgueres"],
      description: "Retorna a lista de todos os hambúrgueres cadastrados.",
      responses: {
        200: { description: "Lista de hambúrgueres retornada com sucesso." },
        500: { description: "Erro interno do servidor." }
      }
    }
  },
  "/v1/products/burgers/{id}/ingredients": {
    get: {
      tags: ["Hambúrgueres"],
      description: "Retorna a lista de ingredientes de um hambúrguer específico.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do hambúrguer que deseja consultar os ingredientes."
        }
      ],
      responses: {
        200: { description: "Ingredientes retornados com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Hambúrguer não encontrado." },
        500: { description: "Erro interno do servidor." }
      }
    }
  },
  "/v1/products/burgers/{id}": {
    get: {
      tags: ["Hambúrgueres"],
      description: "Obtém os dados de um hambúrguer específico pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do hambúrguer que deseja buscar."
        }
      ],
      responses: {
        200: { description: "Hambúrguer retornado com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Hambúrguer não encontrado." },
        500: { description: "Erro interno do servidor." }
      }
    },
    put: {
      tags: ["Hambúrgueres"],
      description: "Atualiza os dados de um hambúrguer existente pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do hambúrguer que deseja atualizar."
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                ingredients: {
                  type: "array",
                  items: { type: "string" }
                },
                description: { type: "string" },
                imageSrc: { type: "string" },
                quantity: { type: "number" }
              },
              required: ["name", "price", "ingredients", "description", "imageSrc", "quantity"]
            }
          }
        }
      },
      responses: {
        200: { description: "Hambúrguer atualizado com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Hambúrguer não encontrado." },
        500: { description: "Erro interno do servidor." }
      }
    },
    delete: {
      tags: ["Hambúrgueres"],
      description: "Remove um hambúrguer do catálogo pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID do hambúrguer que deseja deletar."
        }
      ],
      responses: {
        200: { description: "Hambúrguer deletado com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Hambúrguer não encontrado." },
        500: { description: "Erro interno do servidor." }
      }
    }
  },
  "/v1/products/drinks": {
    post: {
      tags: ["Bebidas"],
      description: "Adiciona uma nova bebida ao catálogo de produtos.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                description: { type: "string" },
                imageSrc: { type: "string" },
                quantity: { type: "number" }
              },
              required: ["name", "price", "description", "imageSrc", "quantity"]
            }
          }
        }
      },
      responses: {
        201: { description: "Bebida criada com sucesso." },
        400: { description: "Requisição inválida." },
        500: { description: "Erro interno do servidor." }
      }
    },
    get: {
      tags: ["Bebidas"],
      description: "Retorna a lista de todas as bebidas cadastradas.",
      responses: {
        200: { description: "Lista de bebidas retornada com sucesso." },
        500: { description: "Erro interno do servidor." }
      }
    }
  },
  "/v1/products/drinks/{id}": {
    get: {
      tags: ["Bebidas"],
      description: "Obtém os dados de uma bebida específica pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID da bebida que deseja buscar."
        }
      ],
      responses: {
        200: { description: "Bebida retornada com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Bebida não encontrada." },
        500: { description: "Erro interno do servidor." }
      }
    },
    put: {
      tags: ["Bebidas"],
      description: "Atualiza os dados de uma bebida existente pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID da bebida que deseja atualizar."
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                description: { type: "string" },
                imageSrc: { type: "string" },
                quantity: { type: "number" }
              },
              required: ["name", "price", "description", "imageSrc", "quantity"]
            }
          }
        }
      },
      responses: {
        200: { description: "Bebida atualizada com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Bebida não encontrada." },
        500: { description: "Erro interno do servidor." }
      }
    },
    delete: {
      tags: ["Bebidas"],
      description: "Remove uma bebida do catálogo pelo seu ID.",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          type: "string",
          description: "ID da bebida que deseja deletar."
        }
      ],
      responses: {
        200: { description: "Bebida deletada com sucesso." },
        400: { description: "Requisição inválida." },
        404: { description: "Bebida não encontrada." },
        500: { description: "Erro interno do servidor." }
      }
    }
  }
}

export default swaggerExtra
