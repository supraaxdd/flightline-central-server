import { IUser } from "../models/IUser";
import { IUserRepository } from "./IUserRepository";
import { pool } from "../../config/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";

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

    public async getUserWithRolesById(id: number): Promise<IUser | null> {
        const sql = `
            SELECT u.id, u.discord_id, u.username, r.id AS role_id, r.name AS role_name
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

        const userData = rows[0];
        
        if (userData === undefined) return null;

        const user: IUser = {
            id: userData.id,
            discord_id: userData.discord_id,
            username: userData.username,
            roles: []
        };

        for (const row of rows) {
            if (row.role_id) {
                user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return user;
    }

    public async getUserWithRolesByDiscordId(discordId: string): Promise<IUser | null> {
        const sql = `
            SELECT u.id, u.discord_id, u.username, r.id AS role_id, r.name AS role_name
            FROM user u
            LEFT JOIN userrole ur ON ur.user_id = u.id
            LEFT JOIN role r ON r.id = ur.role_id
            WHERE u.discord_id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [discordId]
        );

        if (rows.length === 0) return null;

        const userData = rows[0];

        if (userData === undefined) return null;

        const user: IUser = {
            id: userData.id,
            discord_id: userData.discord_id,
            username: userData.username,
            roles: []
        };

        for (const row of rows) {
            if (row.role_id) {
                user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return user;
    }

    public async getUserWithRolesByUsername(username: string): Promise<IUser | null> {
        const sql = `
            SELECT u.id, u.discord_id, u.username, r.id AS role_id, r.name AS role_name
            FROM user u
            LEFT JOIN userrole ur ON ur.user_id = u.id
            LEFT JOIN role r ON r.id = ur.role_id
            WHERE u.username = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [username]
        );

        if (rows.length === 0) return null;

        const userData = rows[0];

        if (userData === undefined) return null;

        const user: IUser = {
            id: userData.id,
            discord_id: userData.discord_id,
            username: userData.username,
            roles: []
        };

        for (const row of rows) {
            if (row.role_id) {
                user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return user;
    }

    public async createUser(discordId: string, username: string): Promise<boolean> {
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

    public async deleteUserById(id: number): Promise<boolean> {
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

    public async deleteUserByDiscordId(discordId: string): Promise<boolean> {
        const sql = `
            DELETE FROM user
            WHERE discord_id = ?
        `;

        const [rows] = await pool.execute<ResultSetHeader>(
            sql,
            [discordId]
        );

        if (rows.affectedRows === 0) return false;

        return true;
    }

    public async deleteUserByUsername(username: string): Promise<boolean> {
        const sql = `
            DELETE FROM user
            WHERE username = ?
        `;

        const [rows] = await pool.execute<ResultSetHeader>(
            sql,
            [username]
        );

        if (rows.affectedRows === 0) return false;

        return true;
    }
}