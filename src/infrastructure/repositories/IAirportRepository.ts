import { IAirport } from "../models/IAirport";

export interface IAirportRepository {
	getById(id: number): Promise<IAirport | null>;
	getByName(name: string): Promise<IAirport | null>;
	exists(id: number): Promise<boolean>;
	create(name: string): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}