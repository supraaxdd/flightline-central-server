import { IEventController } from "../models/IEventController";
import { IEventControllerAttendeeRepository } from "./IEventControllerAttendeeRepository";
import { pool } from "../../config/config"
import { RowDataPacket } from "mysql2";

export class EventControllerAttendeeRepository implements IEventControllerAttendeeRepository {
    public async getController(eventId: number, userId: number): Promise<IEventController | null> {
        const sql = `
            SELECT
                u.id            AS user_id,
                u.discord_id    AS user_discord_id,
                u.username      AS user_username,
                cp.controller_since,

                cq.position_id  AS controller_qualification_position_id,
                qp.name         AS controller_qualification_position_name,

                a.id            AS airport_id,
                a.name          AS airport_name,

                p.id            AS position_id,
                p.name          AS position_name
            FROM eventcontrollerattendee eca
            JOIN user u
                ON eca.user_id = u.id
            JOIN controllerprofile cp
                ON cp.user_id = u.id
            JOIN controllerqualification cq
                ON cq.user_id = u.id
            JOIN controllerposition qp
                ON qp.id = cq.position_id
            JOIN airport a
                ON a.id = eca.airport_id
            JOIN controllerposition p
                ON p.id = eca.position_id
            WHERE eca.event_id = ?
            AND u.id = ?;
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [eventId, userId]
        );

        if (rows.length === 0) return null;

        const data = rows[0];
        if (data === undefined) return null;
        
        const eventController: IEventController = {
            controller: {
                user: {
                    id: data.user_id,
                    discord_id: data.user_discord_id,
                    username: data.user_username
                },
                controller_since: data.controller_since,
                qualification: {
                    id: data.controller_qualification_position_id,
                    name: data.controller_qualification_position_name
                }
            },
            airport: {
                id: data.airport_id,
                name: data.airport_name
            },
            position: {
                id: data.position_id,
                name: data.position_name
            }
        };

        return eventController;
    }

    public async updateControllerAssignment(eventId: number, userId: number): Promise<boolean> {
        throw new Error("Method not implemented yet.");
    }
}