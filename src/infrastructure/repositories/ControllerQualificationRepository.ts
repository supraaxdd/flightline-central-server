import { RowDataPacket } from "mysql2";
import { pool } from "../../config/config";
import { IControllerPosition } from "../models/IControllerPosition";
import { IControllerQualificationRepository } from "./IControllerQualificationRepository";


export class ControllerQualificationRepository implements IControllerQualificationRepository {
    public async getByUserId(userId: number): Promise<IControllerPosition | null> {
        const sql = `
        SELECT cpo.id AS position_id, cpo.name AS name
            FROM user u, controllerposition cpo, controllerqualification cq
            WHERE cq.user_id = u.id
            AND cq.position_id = cpo.id
            AND u.id = ?;
            `;
            
        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [userId]
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
}