import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../../config/config";
import { IEvent } from "../models/IEvent";
import { IEventRepository } from "./IEventRepository";
import { IEventController } from "../models/IEventController";
import { IRole } from "../models/IRole";
import { IEventSummaryDto } from "../dtos/IEventSummaryDto";
import { IEventUpdateDto } from "../dtos/IEventUpdateDto";

export class EventRepository implements IEventRepository {
    private static instance?: EventRepository;

    private constructor() { };

    public static getInstance() {
        if (!EventRepository.instance) {
            EventRepository.instance = new EventRepository();
        }

        return EventRepository.instance;
    }

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
            FROM eventcontrollerattendee eca
				JOIN user u
                ON eca.user_id = u.id
				JOIN airport a
                ON eca.airport_id = a.id
                JOIN controllerposition p
                ON eca.position_id = p.id
                JOIN controllerprofile cp
                ON cp.user_id = u.id
                RIGHT JOIN event e
                ON eca.event_id = e.id
			WHERE e.id = ?;
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
            active: eventData.active,
            controllers: []
        }

		// If the controller_user_id (a NOT NULL column) is null, then there must be no controllers in this event
		if (eventData.controller_user_id === null) {
			return event;
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

    public async getEventsHostedByUserById(userId: number): Promise<IEventSummaryDto[] | null> {
        const sql = `
            SELECT
                e.id,
                e.date_hosted,
                COUNT(eca.user_id) AS controller_count
            FROM event e
            LEFT JOIN eventcontrollerattendee eca ON eca.event_id = e.id
            WHERE e.host_id = ?
            GROUP BY e.id;
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [userId]
        );

        if (rows.length === 0) return null;

        const events: IEventSummaryDto[] = [];

        for (const row of rows) {
            events.push({
                id: row.id,
                dateHosted: row.date_hosted,
                controllerCount: row.controller_count
            });
        }

        return events;
    }

    public async getActiveEvents(): Promise<IEventSummaryDto[] | null> {
        const sql = `
            SELECT
                e.id,
                e.date_hosted,
                COUNT(eca.user_id) AS controller_count
            FROM event e
            LEFT JOIN eventcontrollerattendee eca ON eca.event_id = e.id
            WHERE e.active = 1
            GROUP BY e.id;
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(sql);

        if (rows.length === 0) return null;

        const events: IEventSummaryDto[] = [];

        for (const row of rows) {
            events.push({
                id: row.id,
                dateHosted: row.date_hosted,
                controllerCount: row.controller_count
            });
        }

        return events;
    }

    public async exists(id: number): Promise<boolean> {
        const sql = `
            SELECT 1 FROM event WHERE id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [id]
        );

        return rows.length > 0;
    }

    public async create(
        userId: number,
        dateHosted: Date
    ): Promise<void> {
        const sql = `
            INSERT INTO event (host_id, date_hosted)
            VALUES (?, ?)
        `;

        await pool.execute<ResultSetHeader>(
            sql,
            [userId, dateHosted]
        );
    }

    public async delete(id: number): Promise<void> {
        const sql = `
            DELETE FROM event
            WHERE id = ?
        `;

        await pool.execute<ResultSetHeader>(
            sql,
            [id]
        );
    }

    public async update(
        id: number,
        change: IEventUpdateDto
    ): Promise<void> {
        const fields = [];
        const values = [];

        if (
            change.hostId === undefined &&
            change.dateHosted === undefined &&
            change.active === undefined
        ) return;

        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction();

            if (change.hostId !== undefined) {
                fields.push('host_id = ?');
                values.push(change.hostId);
            }

            if (change.dateHosted !== undefined) {
                fields.push('date_hosted = ?');
                values.push(change.dateHosted);
            }

            if (change.active !== undefined) {
                fields.push('active = ?');
                values.push(change.active ? 1 : 0);
            }

            if (fields.length > 0) {
                const sql = `
                    UPDATE event
                    SET ${fields.join(', ')}
                    WHERE id = ?
                `;

                values.push(id);

                await conn.execute<ResultSetHeader>(sql, values);
            }

            await conn.commit();
        } catch (e) {
            await conn.rollback();
            throw e;
        } finally {
            conn.release();
        }
    }
}
