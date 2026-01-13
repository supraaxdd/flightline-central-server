import { RowDataPacket } from "mysql2";
import { pool } from "../../config/config";
import { IEvent } from "../models/IEvent";
import { IEventRepository } from "./IEventRepository";
import { IEventController } from "../models/IEventController";
import { IRole } from "../models/IRole";

export class EventRepository implements IEventRepository {
    public async getEventById(id: number): Promise<IEvent | null> {
        let sql = `
            SELECT 
                e.id AS event_id,
                e.date_hosted,
                e.host_id,
                (
                    SELECT u.username
                    FROM event e, user u
                    WHERE e.host_id = u.id
                    AND e.id = ?
                ) AS host_username,
                (
                    SELECT u.discord_id
                    FROM event e, user u
                    WHERE e.host_id = u.id
                    AND e.id = ?
                ) AS host_discord_id,
                u.id AS controller_user_id,
                u.discord_id AS controller_discord_id,
                u.username AS controller_username,
                cp.controller_since,
                (
                    SELECT p.id
                    FROM controllerposition p, controllerqualification cq, user ur
                    WHERE cq.position_id = p.id
                    AND cq.user_id = ur.id
                    AND ur.id = u.id
                ) AS controller_qualification_position_id,
                (
                    SELECT p.name
                    FROM controllerposition p, controllerqualification cq, user ur
                    WHERE cq.position_id = p.id
                    AND cq.user_id = ur.id
                    AND ur.id = u.id
                ) AS controller_qualification_position_name,
                a.id AS airport_id,
                a.name AS airport_name,
                p.id AS position_id,
                p.name AS position_name
            FROM eventcontrollerattendee eca, event e, user u, airport a, controllerposition p, controllerprofile cp
            WHERE eca.event_id = e.id
            AND eca.user_id = u.id
            AND eca.airport_id = a.id
            AND eca.position_id = p.id
            AND cp.user_id = u.id
            AND e.id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id, id, id]
        );

        if (rows.length === 0) return null;

        const eventData = rows[0];

        if (eventData === undefined) return null;

        const event: IEvent = {
            id: eventData.event_id,
            host: {
                id: eventData.host_id,
                discord_id: eventData.host_discord_id,
                username: eventData.host_username,
                roles: []
            },
            dateHosted: eventData.date_hosted,
            controllers: []
        }

        for (const row of rows) {
            const eventController: IEventController = {
                controller: {
                    user: {
                        id: row.controller_user_id,
                        discord_id: row.controller_discord_id,
                        username: row.controller_username,
                        roles: []
                    },
                    controller_since: row.controller_since,
                    qualification: {
                        id: row.controller_qualification_position_id,
                        name: row.controller_qualification_position_name
                    }
                },
                airport: {
                    id: row.airport_id,
                    name: row.airport_name
                },
                position: {
                    id: row.position_id,
                    name: row.position_name
                }
            }

            sql = `
                SELECT r.id, r.name
                FROM role r, user u, userrole ur
                WHERE ur.user_id = u.id
                AND ur.role_id = r.id
                AND u.id = ?;
            `;

            const [userRolesRows] = await pool.execute<RowDataPacket[]>(
                sql,
                [row.controller_user_id]
            );

            if (userRolesRows.length === 0)
                event.controllers!.push(eventController);
            else {
                for (const roleRow of userRolesRows) {
                    const role: IRole = {
                        id: roleRow.id,
                        name: roleRow.name
                    }

                    eventController.controller.user.roles!.push(role);
                }

                event.controllers!.push(eventController);
            }
        }

        return event;
    }

    getEventsHostedByUserById(userId: number): Promise<IEvent[] | null> {
        throw new Error("Method not implemented.");
    }

    getEventsHostedByUserByDiscordId(discordId: string): Promise<IEvent[] | null> {
        throw new Error("Method not implemented.");
    }

    getEventsHostedByUserByUsername(username: string): Promise<IEvent[] | null> {
        throw new Error("Method not implemented.");
    }
}