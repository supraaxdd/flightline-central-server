import { IUser } from "../models/IUser";
import { IUserRepository } from "./IUserRepository";
import { pool } from "../../config/config";

export class UserRepository implements IUserRepository {
    public async getUserById(id: number): IUser {
        try {
            const [results, fields] = await pool.query(
                'SELECT * FROM user WHERE id = ?', [id]
            );

            console.log(results);
        } catch (e) {
            console.error(e);
        }
    };

    public getUserByDiscordId(discordId: string): IUser {
        
    }

    public getUserByUsername(username: string): IUser {
        
    }

    public createUser(): void {
        
    }

    public deleteUserById(id: number): void {
        
    }

    public deleteUserByDiscordId(discordId: string): void {
        
    }

    public deleteUserByUsername(username: string): void {
        
    }
}