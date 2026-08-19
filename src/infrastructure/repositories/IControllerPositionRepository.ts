import { IControllerPosition } from "../models/IControllerPosition";

export interface IControllerPositionRepository {
	getById(id: number): Promise<IControllerPosition | null>;
	getByName(name: string): Promise<IControllerPosition | null>;
	getAll(): Promise<IControllerPosition[]>;
	exists(id: number): Promise<boolean>;
}