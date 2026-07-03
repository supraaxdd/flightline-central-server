import { IControllerPosition } from "../models/IControllerPosition";

export interface IControllerPositionRepository {
	getById(id: number): Promise<IControllerPosition | null>;
	getByName(name: string): Promise<IControllerPosition | null>;
	exists(id: number): Promise<boolean>;
}