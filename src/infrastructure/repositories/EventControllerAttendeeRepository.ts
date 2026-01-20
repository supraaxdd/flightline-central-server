import { IEventController } from "../models/IEventController";
import { IEventControllerAttendeeRepository } from "./IEventControllerAttendeeRepository";
import { pool } from "../../config/config"
import { RowDataPacket } from "mysql2";

export class EventControllerAttendeeRepository implements IEventControllerAttendeeRepository {
    public async getControllerAssignment(eventId: number, userId: number): Promise<IEventController | null> {
        const sql = `
            SELECT u.id AS user_id, u.discord_id AS user_discord_id, u.username AS user_username, a.id AS airport_id, a.name AS airport_name, p.id AS position_id, p.name AS position_name
            FROM eventcontrollerattendee eca, user u, airport a, controllerposition p
            WHERE eca.user_id = u.id
            AND eca.airport_id = a.id
            AND eca.position_id = p.id
            AND event_id = ?
            AND user_id = ?;
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [eventId, userId]
        );

        if (rows.length === 0) return null;

        const data = rows[0];
        if (data === undefined) return null;
        
        // const eventController: IEventController = {
        //     controller: {
        //         user: {
        //             id: data.user_id,
        //             discord_id: data.user_discord_id,
        //             username: data.user_username
        //         },
        //     }
        // }

        throw new Error("Method not implemented yet.");
    }

    public async updateControllerAssignment(eventId: number, userId: number): Promise<boolean> {
        throw new Error("Method not implemented yet.");
    }
}