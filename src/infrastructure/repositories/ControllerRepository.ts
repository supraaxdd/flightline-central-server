import { pool } from "../../config/config";
import { IController } from "../models/IController";
import { IControllerRepository } from "./IControllerRepository";
import { RowDataPacket } from "mysql2";

export class ControllerRepository implements IControllerRepository {
    private CONTROLLER_ROLE_ID = 2;

    public async getByUserId(id: number): Promise<IController | null> {
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

    public async create(
        userId: number,
        controllerSince: Date
    ): Promise<boolean> {
        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction();

            // 1. controllerprofile
            await conn.execute(
                `
                    INSERT INTO controllerprofile (user_id, controller_since)
                    VALUES (?, ?)
                `,
                [userId, controllerSince]
            );

            // 2. controllerqualification
            await conn.execute(
                `
                    INSERT INTO controllerqualification (user_id, position_id)
                    VALUES (?, ?)
                `,
                [userId, 1]
            );

            // 3. userrole (Controller role)
            await conn.execute(
                `
                    INSERT INTO userrole (user_id, role_id)
                    VALUES (?, ?)
                `,
                [userId, this.CONTROLLER_ROLE_ID]
            );

            await conn.commit();
            return true;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    public async delete(id: number): Promise<boolean> {
        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction();

            // 1. controllerprofile
            await conn.execute(
                `
                    DELETE FROM controllerprofile
                    WHERE user_id = ?
                `,
                [id]
            );

            // 2. controllerqualification
            await conn.execute(
                `
                    DELETE FROM controllerqualification
                    WHERE user_id = ?
                `,
                [id]
            );

            // 3. userrole (Controller role)
            await conn.execute(
                `
                    DELETE FROM userrole
                    WHERE user_id = ?
                    AND role_id = ?
                `,
                [id, this.CONTROLLER_ROLE_ID]
            );

            await conn.commit();
            return true;
        } catch (err) {
            await conn.rollback();
            throw err;
        } finally {
            conn.release();
        }
    }

    public async update(id: number): Promise<boolean> {
        throw new Error("Method not implemented yet.");
    }

}