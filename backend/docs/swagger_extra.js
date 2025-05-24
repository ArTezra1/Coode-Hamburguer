const swaggerExtra = {
    "/products/burgers": {
    get: { tags: ["Hambúrgueres"] },
    post: { tags: ["Hambúrgueres"] },
  },
    "/products/burgers/{id}": {
    get: {
      tags: ["Hambúrgueres"],
      description: "Obter hambúrguer pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID do hambúrguer"
        }
      ],
      responses: {
        200: {
          description: "Hambúrguer encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Burger"
              }
            }
          }
        },
        404: { description: "Hambúrguer não encontrado" },
        500: { description: "Erro no servidor" }
      }
    },
    put: {
      tags: ["Hambúrgueres"],
      description: "Atualiza hambúrguer pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID do hambúrguer"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Burger"
            }
          }
        }
      },
      responses: {
        200: { description: "Hambúrguer atualizado com sucesso" },
        404: { description: "Hambúrguer não encontrado" },
        500: { description: "Erro no servidor" }
      }
    },
    delete:{
      tags: ["Hambúrgueres"],
      description: "Deleta hambúrguer pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
          description: "ID do hambúrguer"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Burger"
            }
          }
        }
      },
      responses: {
        200: { description: "Hambúrguer atualizado com sucesso" },
        404: { description: "Hambúrguer não encontrado" },
        500: { description: "Erro no servidor" }
      }  
    }
  }
}

export default swaggerExtra