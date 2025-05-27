import jsonwebtoken from "jsonwebtoken"

function CheckToken(req, res, next) {
    const headerAuth = req.header("Authorization")

    if (!headerAuth) {
        return res.status(401).json({
            message: "Acesso negado, é preciso do token."
        })
    }

    const token = headerAuth.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            message: "Acesso negado, é preciso do token."
        })
    }

    try {
        const decodificado = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)

        req.user = decodificado

        next()

    } catch (error) {
        return res.status(401).json({
            message: "Token invalido ou expirado."
        })
    }
}

export default CheckToken