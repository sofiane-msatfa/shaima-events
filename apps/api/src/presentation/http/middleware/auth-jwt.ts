import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from "express";
import { env } from '../../../env.js';
import { UserModel, type UserDocument } from '@/infrastructure/database/mongo/model/user.js';

// Étendre l'interface Request pour inclure la propriété user
declare global {
    namespace Express {
        interface Request {
            user?: UserDocument; 
        }
    }
}


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies.jwt_token;

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, env.JWT_SECRET, async (err: jwt.VerifyErrors | null, decoded: any | undefined) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        if (!decoded || typeof decoded.id !== 'string') {
            return res.status(401).send({ message: "Unauthorized!" });
        }

        try {
            const user = await UserModel.findById(decoded.id);
            
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            req.user = user; // Ajouter l'utilisateur à l'objet de la requête pour une utilisation ultérieure si nécessaire

            next();
        } catch (error) {
            console.error("Error finding user:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    });
};

export const getUserFromJWT = async (jwtToken: string): Promise<UserDocument | null> => {
    try {
        const decoded: any = jwt.verify(jwtToken, env.JWT_SECRET);
        
        const userId: string = decoded.id;

        const user: UserDocument | null = await UserModel.findById(userId);
        
        return user; 
        
    } catch (error) {
        console.error("Error retrieving user from JWT:", error);
        return null; 
    }
};