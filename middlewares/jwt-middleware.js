import jwt from 'jsonwebtoken';

const authenticateToken = (req,res,next)=>{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];

    if(!token){
        return res.status(401).json({error: '❌❌ Access denied. Token is missing ❌❌'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({error: '❌❌ Access denied. Invalid token ❌❌'});
    }
};

export default authenticateToken;