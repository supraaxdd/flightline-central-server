import { IControllerPosition } from "../models/IControllerPosition";
import { IControllerPositionRepository } from "./IControllerPositionRepository";
import { pool } from "../../config/config";
import { RowDataPacket } from "mysql2";

export class ControllerPositionRepository implements IControllerPositionRepository {
	private static instance?: ControllerPositionRepository;

	private constructor() { };

	public static getInstance() {
		if (!ControllerPositionRepository.instance) {
			ControllerPositionRepository.instance = new ControllerPositionRepository();
		}

		return ControllerPositionRepository.instance;
	}
	
	public async getById(id: number): Promise<IControllerPosition | null> {
		const sql = `
			SELECT * FROM controllerposition
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

	public async getByName(name: string): Promise<IControllerPosition | null> {
		const sql = `
			SELECT * FROM controllerposition
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

	public async getAll(): Promise<IControllerPosition[]> {
		const sql = `
			SELECT * FROM controllerposition
			ORDER BY id
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(sql);

		return rows.map(row => ({
			id: row.id,
			name: row.name
		}));
	}

	public async exists(id: number): Promise<boolean> {
		const sql = `
			SELECT 1 FROM controllerposition WHERE id = ?
		`;

		const [rows] = await pool.execute<RowDataPacket[]>(
			sql,
			[id]
		);

		return rows.length > 0;
	}
}