import { IUserUpdateDto } from "../dtos/IUserUpdateDto";
import { IRole } from "../models/IRole";
import { IUser } from "../models/IUser";

export interface IUserRepository {
    getById(id: number): Promise<IUser | null>;
    getByDiscordId(discordId: string): Promise<IUser | null>;
    getByUsername(username: string): Promise<IUser | null>;
    getRoles(id: number): Promise<IRole[] | null>;
    existsById(id: number): Promise<boolean>;
    existsByDiscordId(discordId: string): Promise<boolean>;
    create(discordId: string, username: string): Promise<void>;
    update(id: number, change: IUserUpdateDto): Promise<boolean>;
    delete(id: number): Promise<void>;
}