import jwt from 'jsonwebtoken';


const authenticateUser = async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(!authHeader ){
        res.status(401).json({
            message: "No Authorization Header, You Need to Login first!"
        });
    }
    if(authHeader || authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(!token){
            res.status(401).json({
                message: "No Token, Authorization denied!"
            });
        }
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
        
            next();
            
            
        } catch (error) {
            res.status(400).json({
                message: "Token is not Valid!",
                error: error.message
            })
            
        }
    }
}

export default authenticateUser;
