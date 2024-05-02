import { Document, Model, Schema, model } from "mongoose";
import { z } from "zod";

// Interface représentant le document utilisateur dans la base de données MongoDB
export interface UserDocument extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
    roles: string[];      
}

// Schéma Mongoose pour l'utilisateur
export const UserSchema: Schema<UserDocument> = new Schema<UserDocument>({
    username: { type: String, index: true },
    email: { type: String, index: true },
    password: { type: String },
    roles: { type: [String], default: ['ROLE_USER'] }
});

// Modèle utilisateur
export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema, 'user');

// Schéma Zod pour la validation des données utilisateur
export const userZodSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email(),
    password: z.string().min(6),
    roles: z.array(z.string().default('ROLE_USER')).optional() // Les rôles sont des chaînes de caractères
});


