import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorGenerator } from "./ErrorGenerator";

dotenv.config();

const jwtKey = process.env.JWT_KEY as string;

export class TokenGenerator {
    static generateToken: any;
    static tokenGenerator: TokenGenerator;
    public generateToken(username: string) {
        const token = jwt.sign({ username }, jwtKey, { expiresIn: '24h' });
        return token;
    }

    public verifyToken(token: string) {
        try{
            const decoded = jwt.verify(token, jwtKey);
            return decoded;
        } catch (err:any) {
            throw new Error(`Error creating token: ${err.message}`);
        }
    }
    
    public refreshToken(token: string) {
        try{
            const decoded = jwt.verify(token, jwtKey);
            const newToken = jwt.sign({ username: decoded }, jwtKey, { expiresIn: '24h' });
            return newToken;
        } catch (err:any) {
            throw new Error(`Error refreshing token: ${err.message}`);
        }
    }

};