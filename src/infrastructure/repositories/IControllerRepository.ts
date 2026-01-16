import { IController } from "../models/IController";
import { IControllerPosition } from "../models/IControllerPosition";
import { IUser } from "../models/IUser";

export interface IControllerRepository {
    getById(id: number): Promise<IController | null>;
    getByDiscordId(discordId: string): Promise<IController | null>;
    getByUsername(username: string): Promise<IController | null>;
    getQualificationById(id: number): Promise<IControllerPosition | null>;
    getQualificationByDiscordId(discordId: string): Promise<IControllerPosition | null>;
    getQualificationByUsername(username: string): Promise<IControllerPosition | null>;
    create(user: IUser): Promise<boolean>;
    create(userId: number): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    deleteByDiscordId(discordId: string): Promise<boolean>;
    deleteByUsername(username: string): Promise<boolean>;
}