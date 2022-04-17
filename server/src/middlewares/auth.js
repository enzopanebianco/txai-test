const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.headers['authorization']
    if(!token){
        res.status(401).json({message:"Sem token"})
    }
    try {
        const decoded = jwt.verify(token,'authToken');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({message:"Token inválido"})
    }
}