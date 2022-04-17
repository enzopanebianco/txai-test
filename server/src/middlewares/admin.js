const jwt = require('jsonwebtoken');
module.exports = (req,res,next) =>{
    const token = req.headers['authorization']
    if(!token){
        res.status(401).json({message:"Sem token"})
    }
    try {
        const decoded = jwt.verify(token,'authToken');
      
        if(decoded.role==2){
            res.status(403).json({message:"Você não tem permissão"})

        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(403).json({message:"Token inválido"})

    }
}