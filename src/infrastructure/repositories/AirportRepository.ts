import { RowDataPacket } from "mysql2";
import { pool } from "../../config/config";
import { IAirport } from "../models/IAirport";
import { IAirportRepository } from "./IAirportRepository";

export class AirportRepository implements IAirportRepository {
	private static instance?: AirportRepository;

	private constructor() { };

	public static getInstance() {
		if (!AirportRepository.instance) {
			AirportRepository.instance = new AirportRepository();
		}

		return AirportRepository.instance;
	}
	
	public async getById(id: number): Promise<IAirport | null> {
		const sql = `
			SELECT * FROM airport
			WHERE id = ?
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(
			sql,
			[id]
		);

		if (rows.length === 0) return null;

		const data = rows[0];

		if (data === undefined) return null;

		return {
			id: data.id,
			name: data.name
		}
	}

	public async getByName(name: string): Promise<IAirport | null> {
		const sql = `
			SELECT * FROM airport
			WHERE name = ?
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(
			sql,
			[name]
		);

		if (rows.length === 0) return null;

		const data = rows[0];

		if (data === undefined) return null;

		return {
			id: data.id,
			name: data.name
		}
	}

	public async getAll(): Promise<IAirport[]> {
		const sql = `
			SELECT * FROM airport
			ORDER BY name
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(sql);

		return rows.map(row => ({
			id: row.id,
			name: row.name
		}));
	}

	public async exists(id: number): Promise<boolean> {
		const sql = `
			SELECT 1 FROM airport WHERE id = ?
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(
			sql,
			[id]
		);

		return rows.length > 0;
	}
}