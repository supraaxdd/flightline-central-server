import { IUser } from "../models/IUser";
import { IUserRepository } from "./IUserRepository";
import { pool } from "../../config/config";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IRole } from "../models/IRole";
import { IUserUpdateDto } from "../dtos/IUserUpdateDto";

export class UserRepository implements IUserRepository {
    private static instance?: UserRepository;

    private constructor() { };

    public static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

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

    public async existsById(id: number): Promise<boolean> {
        const sql = `
            SELECT 1 FROM user WHERE id = ?
        `;

        const [row] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        return row.length > 0;
    }

    public async existsByDiscordId(discordId: string): Promise<boolean> {
        const sql = `
            SELECT 1 FROM user WHERE discord_id = ?
        `;

        const [row] = await pool.execute<RowDataPacket[]>(
            sql,
            [discordId]
        );

        return row.length > 0;
    }

    public async create(
        discordId: string,
        username: string
    ): Promise<boolean> {
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

    public async update(
        id: number,
        change: IUserUpdateDto
    ): Promise<boolean> {
        const fields = [];
        const values = [];

        if (
            change.discordId === undefined &&
            change.username === undefined
        ) return false;

        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction();

            let updated = false;

            if (change.discordId !== undefined) {
                fields.push('discord_id = ?');
                values.push(change.discordId);
            }

            if (change.username !== undefined) {
                fields.push('username = ?');
                values.push(change.username);
            }

            if (fields.length > 0) {
                const sql = `
                    UPDATE user
                    SET ${fields.join(', ')}
                    WHERE id = ?
                `;

                values.push(id);

                const [result] = await conn.execute<ResultSetHeader>(sql, values);
                if (result.affectedRows > 0) updated = true;
            }

            await conn.commit();
            return updated;
        } catch (e) {
            await conn.rollback();
            throw e;
        } finally {
            conn.release();
        }
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