import { IRole } from "../models/IRole";
import { IUser } from "../models/IUser";

export interface IUserRepository {
    getById(id: number): Promise<IUser | null>;
    getByDiscordId(discordId: string): Promise<IUser | null>;
    getByUsername(username: string): Promise<IUser | null>;
    getRoles(id: number): Promise<IRole[] | null>;
    create(discordId: string, username: string): Promise<boolean>;
    delete(id: number): Promise<boolean>;
}