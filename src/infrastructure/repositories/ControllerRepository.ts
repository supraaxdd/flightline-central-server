import { pool } from "../../config/config";
import { IController } from "../models/IController";
import { IControllerPosition } from "../models/IControllerPosition";
import { IUser } from "../models/IUser";
import { IControllerRepository } from "./IControllerRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ControllerRepository implements IControllerRepository {
    public async getById(id: number): Promise<IController | null> {
        let sql = `
        SELECT u.id, u.discord_id, u.username, cpo.id AS position_id, cpo.name AS position, cp.controller_since
        FROM user u, controllerposition cpo, controllerprofile cp, controllerqualification cq
        WHERE cq.user_id = u.id
        AND cq.position_id = cpo.id
        AND cp.user_id = u.id
        AND u.id = ?
        `;
        
        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        if (rows.length === 0) return null;

        const controllerData = rows[0];

        if (controllerData === undefined) return null;
        
        const controller: IController = {
            user: {
                id: controllerData.id,
                discord_id: controllerData.discord_id,
                username: controllerData.username,
                roles: []
            },
            controller_since: controllerData.controller_since,
            qualification: {
                id: controllerData.position_id,
                name: controllerData.position
            }
        }

        sql = `
            SELECT r.id AS role_id, r.name AS role_name
            FROM role r
            RIGHT JOIN userrole ur ON r.id = ur.role_id
            RIGHT JOIN user u ON ur.user_id = u.id
            WHERE u.id = ?;
        `;
        
        const [roleRows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        if (roleRows.length === 0) return controller;

        for (const row of roleRows) {
            if (row.role_id) {
                controller.user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return controller;
    }

    public async getByDiscordId(discordId: string): Promise<IController | null> {
        let sql = `
            SELECT u.id, u.discord_id, u.username, cpo.id AS position_id, cpo.name AS position, cp.controller_since
            FROM user u, controllerposition cpo, controllerprofile cp, controllerqualification cq
            WHERE cq.user_id = u.id
            AND cq.position_id = cpo.id
            AND cp.user_id = u.id
            AND u.discord_id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [discordId]
        );

        if (rows.length === 0) return null;
        
        const controllerData = rows[0];
        
        if (controllerData === undefined) return null;
        
        const controller: IController = {
            user: {
                id: controllerData.id,
                discord_id: controllerData.discord_id,
                username: controllerData.username,
                roles: []
            },
            controller_since: controllerData.controller_since,
            qualification: {
                id: controllerData.position_id,
                name: controllerData.position
            }
        }

        sql = `
            SELECT r.id AS role_id, r.name AS role_name
            FROM role r
            RIGHT JOIN userrole ur ON r.id = ur.role_id
            RIGHT JOIN user u ON ur.user_id = u.id
            WHERE u.discord_id = ?;
        `;

        const [roleRows] = await pool.execute<RowDataPacket[]>(
            sql,
            [discordId]
        );

        if (roleRows.length === 0) return controller;

        for (const row of roleRows) {
            if (row.role_id) {
                controller.user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return controller;
        
    }

    public async getByUsername(username: string): Promise<IController | null> {
        let sql = `
            SELECT u.id, u.discord_id, u.username, cpo.id AS position_id, cpo.name AS position, cp.controller_since
            FROM user u, controllerposition cpo, controllerprofile cp, controllerqualification cq
            WHERE cq.user_id = u.id
            AND cq.position_id = cpo.id
            AND cp.user_id = u.id
            AND u.username = ?
            `;
            
        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [username]
        );

        if (rows.length === 0) return null;

        const controllerData = rows[0];
        
        if (controllerData === undefined) return null;
        
        const controller: IController = {
            user: {
                id: controllerData.id,
                discord_id: controllerData.discord_id,
                username: controllerData.username,
                roles: []
            },
            controller_since: controllerData.controller_since,
            qualification: {
                id: controllerData.position_id,
                name: controllerData.position
            }
        }

        sql = `
            SELECT r.id AS role_id, r.name AS role_name
            FROM role r
            RIGHT JOIN userrole ur ON r.id = ur.role_id
            RIGHT JOIN user u ON ur.user_id = u.id
            WHERE u.username = ?;
            `;
            
        const [roleRows] = await pool.execute<RowDataPacket[]>(
            sql,
            [username]
        );

        if (roleRows.length === 0) return controller;
        
        for (const row of roleRows) {
            if (row.role_id) {
                controller.user.roles!.push({
                    id: row.role_id,
                    name: row.role_name
                });
            }
        }

        return controller;
    }
    
    public async getQualificationById(id: number): Promise<IControllerPosition | null> {
        const sql = `
        SELECT cpo.id AS position_id, cpo.name AS name
            FROM user u, controllerposition cpo, controllerqualification cq
            WHERE cq.user_id = u.id
            AND cq.position_id = cpo.id
            AND u.id = ?;
            `;
            
        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        if (rows.length === 0) return null;
        
        const positionData = rows[0];

        if (positionData === undefined) return null;

        const position: IControllerPosition = {
            id: positionData.position_id,
            name: positionData.name
        };

        return position;
    }
    
    public async getQualificationByDiscordId(discordId: string): Promise<IControllerPosition | null> {
        const sql = `
            SELECT cpo.id AS position_id, cpo.name AS name
            FROM user u, controllerposition cpo, controllerqualification cq
            WHERE cq.user_id = u.id
            AND cq.position_id = cpo.id
            AND u.discord_id = ?;
            `;

            const [rows] = await pool.execute<RowDataPacket[]>(
                sql,
            [discordId]
        );
        
        if (rows.length === 0) return null;
        
        const positionData = rows[0];

        if (positionData === undefined) return null;

        const position: IControllerPosition = {
            id: positionData.position_id,
            name: positionData.name
        };

        return position;
    }
    
    public async getQualificationByUsername(username: string): Promise<IControllerPosition | null> {
        const sql = `
        SELECT cpo.id AS position_id, cpo.name AS name
        FROM user u, controllerposition cpo, controllerqualification cq
        WHERE cq.user_id = u.id
        AND cq.position_id = cpo.id
        AND u.username = ?;
        `;
        
        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [username]
        );
        
        if (rows.length === 0) return null;
        
        const positionData = rows[0];
        
        if (positionData === undefined) return null;

        const position: IControllerPosition = {
            id: positionData.position_id,
            name: positionData.name
        };
        
        return position;
    }
    
    public async create(user: IUser | number): Promise<boolean> {
        const userId = (typeof user === "number") ? user : user.id; 
        const controller_since = new Date();

        const sql = `
            INSERT INTO controllerprofile (user_id, controller_since)
            VALUES (?, ?) 
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [userId, controller_since]
        )

        if (result.affectedRows > 0) return true;
        else return false;
    }

    public async deleteById(id: number): Promise<boolean> {
        const sql = `
            DELETE FROM controllerprofile
            WHERE id = ?
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [id]
        );

        if (result.affectedRows > 0) return true;
        else return false;
    }

    public async deleteByDiscordId(discordId: string): Promise<boolean> {
        const sql = `
            DELETE FROM controllerprofile
            WHERE user_id = (
                SELECT id FROM user
                WHERE discord_id = ?
            )
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [discordId]
        );

        if (result.affectedRows > 0) return true;
        else return false;
    }

    public async deleteByUsername(username: string): Promise<boolean> {
        const sql = `
            DELETE FROM controllerprofile
            WHERE user_id = (
                SELECT id FROM user
                WHERE username = ?
            )
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [username]
        );

        if (result.affectedRows > 0) return true;
        else return false;
    }

}