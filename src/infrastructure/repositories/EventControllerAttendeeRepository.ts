import { IEventController } from "../models/IEventController";
import { IEventControllerAttendeeRepository } from "./IEventControllerAttendeeRepository";
import { pool } from "../../config/config"
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { IEventControllerAttendeeUpdateDto } from "../dtos/IEventControllerAttendeeUpdateDto";

export class EventControllerAttendeeRepository implements IEventControllerAttendeeRepository {
    private static instance?: EventControllerAttendeeRepository;

    private constructor() { };

    public static getInstance() {
        if (!EventControllerAttendeeRepository.instance) {
            EventControllerAttendeeRepository.instance = new EventControllerAttendeeRepository();
        }

        return EventControllerAttendeeRepository.instance;
    }

    public async getController(
        eventId: number,
        userId: number
    ): Promise<IEventController | null> {
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

    public async controllerAssignmentExists(eventId: number, userId: number): Promise<boolean> {
        const sql = `
            SELECT 1 FROM eventcontrollerattendee
            WHERE event_id = ?
            AND user_id = ?
        `;

        const [rows] = await pool.execute<RowDataPacket[]>(
            sql,
            [eventId, userId]
        );

        return rows.length > 0;
    }

    public async createControllerAssignment(eventId: number, userId: number, airportId: number, positionId: number): Promise<boolean> {
        const sql = `
            INSERT INTO eventcontrollerattendee (event_id, user_id, airport_id, position_id) VALUES (?, ?, ?, ?);
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [eventId, userId, airportId, positionId]
        );
        
        if (result.affectedRows > 0) return true;
        else return false;
    }

    public async updateControllerAssignment(eventId: number, userId: number, change: IEventControllerAttendeeUpdateDto): Promise<boolean> {
        const fields = [];
        const values = [];

        if (
            change.airportId === undefined &&
            change.positionId === undefined
        ) return false;

        const conn = await pool.getConnection();

        try {
            await conn.beginTransaction();

            let updated = false;

            if (change.airportId !== undefined) {
                fields.push('airport_id = ?');
                values.push(change.airportId);
            }

            if (change.positionId !== undefined) {
                fields.push('position_id = ?');
                values.push(change.positionId);
            }

            if (fields.length > 0) {
                const sql = `
                    UPDATE eventcontrollerattendee
                    SET ${fields.join(', ')}
                    WHERE event_id = ?
                    AND user_id = ?
                `;
                
                values.push(eventId, userId);

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

    public async deleteControllerAssignment(eventId: number, userId: number): Promise<boolean> {
        const sql = `
            DELETE FROM eventcontrollerattendee
            WHERE event_id = ?
            AND user_id = ?
        `;

        const [result] = await pool.execute<ResultSetHeader>(
            sql,
            [eventId, userId]
        );

        if (result.affectedRows > 0) return true;
        else return false;
    }
}