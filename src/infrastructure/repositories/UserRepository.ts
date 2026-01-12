import { IUser } from "../models/IUser";
import { IUserRepository } from "./IUserRepository";
import { pool } from "../../config/config";
import { RowDataPacket } from "mysql2";

export class UserRepository implements IUserRepository {
    public async getUserById(id: number): Promise<IUser | null> {
        const sql = `
            SELECT * FROM user
            WHERE id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        if (rows.length === 0) return null;

        return rows[0] as IUser;
    };

    public async getUserByDiscordId(discordId: string): Promise<IUser | null> {
        const sql = `
            SELECT * FROM user
            WHERE discord_id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [discordId]
        );

        if (rows.length === 0) return null;

        return rows[0] as IUser;
    }

    public async getUserByUsername(username: string): Promise<IUser | null> {
        const sql = `
            SELECT * FROM user
            WHERE username = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [username]
        );

        if (rows.length === 0) return null;

        return rows[0] as IUser;
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