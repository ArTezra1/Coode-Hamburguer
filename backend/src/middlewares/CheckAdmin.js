function CheckAdmin(req, res, next){
    try {
        if(req.user.role !== "admin"){
            return res.status(401).json({
                message: "Acesso negado: apenas admins."
            })
        }
        next()
        
    } catch (error) {
        console.error(error)
        next(error)
    }
}

export default CheckAdmin