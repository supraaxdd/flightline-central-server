import { IController } from "../models/IController";
import { IControllerPosition } from "../models/IControllerPosition";

export interface IControllerRepository {
    getControllerById(id: number): Promise<IController | null>;
    getControllerByDiscordId(discordId: string): Promise<IController | null>;
    getControllerByUsername(username: string): Promise<IController | null>;
    getControllerQualificationById(id: number): Promise<IControllerPosition | null>;
    getControllerQualificationByDiscordId(discordId: string): Promise<IControllerPosition | null>;
    getControllerQualificationByUsername(username: string): Promise<IControllerPosition | null>;
}