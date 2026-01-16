import { IUser } from "../models/IUser";
import { IUserRepository } from "./IUserRepository";
import { pool } from "../../config/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IRole } from "../models/IRole";

export class UserRepository implements IUserRepository {
    public async getById(id: number): Promise<IUser | null> {
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

    public async getByDiscordId(discordId: string): Promise<IUser | null> {
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

    public async getByUsername(username: string): Promise<IUser | null> {
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

    public async getRoles(id: number): Promise<IRole[] | null> {
        const sql = `
            SELECT r.id AS role_id, r.name AS role_name
            FROM user u
            LEFT JOIN userrole ur ON ur.user_id = u.id
            LEFT JOIN role r ON r.id = ur.role_id
            WHERE u.id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        if (rows.length === 0) return null;

        const roleData = rows[0];
        
        if (roleData === undefined) return null;

        const userRoles: IRole[] = [];

        for (const row of rows) {
            if (row.role_id) {
                userRoles.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return userRoles;
    }

    public async create(discordId: string, username: string): Promise<boolean> {
        const sql = `
            INSERT INTO user (discord_id, username)
            VALUES (?, ?)
        `;

        const [rows] = await pool.execute<ResultSetHeader>(
            sql,
            [discordId, username],
        );

        if (rows.affectedRows === 0) return false;

        return true;
    }

    public async delete(id: number): Promise<boolean> {
        const sql = `
            DELETE FROM user
            WHERE id = ?
        `;

        const [rows] = await pool.execute<ResultSetHeader>(
            sql,
            [id]
        );

        if (rows.affectedRows === 0) return false;

        return true;
    }
}