import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config({quiet: true});

class token {
    static createToken(user, res){
        try{
            const token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user._id,
            },process.env.KEY_SECRET_TOKEN); 

            res.status(201).json({message: "✔ - Token criado com sucesso", Token:`Bearer ${token}`})
        }catch(err){
            res.status(500).json({message: err})
        }
    }

    static async checkToken(req, res, next){
        const tokenHeaders = req.headers.authorization;
        
        const token = tokenHeaders.split(" ")[1];

        if(!token){
            res.status(400).json({message:"🔴 - Token inválido!"});
            return;
        }

        try{
            jwt.verify(token, process.env.KEY_SECRET_TOKEN);    
            next()
        }catch(err){
            res.status(400).json({message: err});
        }
        
    }

    static async getUserByToken(req, res){
        const tokenHeaders = req.headers.authorization;

        const token = tokenHeaders.split(" ")[1];


        if(!token){
            return null;
        }

        try{
            const tokenDecoded = jwt.verify(token, process.env.KEY_SECRET_TOKEN);

            const user = await User.findById(tokenDecoded.id);

            if(!user){
                return null;
            }

            return user;
        }catch(err){
            return null;
        }

    }
}

export default token; 