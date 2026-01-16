import { IUser } from "../models/IUser";

export interface IUserRepository {
    getById(id: number): Promise<IUser | null>;
    getByDiscordId(discordId: string): Promise<IUser | null>;
    getByUsername(username: string): Promise<IUser | null>;
    getWithRolesById(id: number): Promise<IUser | null>;
    getWithRolesByDiscordId(discordId: string): Promise<IUser | null>
    getWithRolesByUsername(username: string): Promise<IUser | null>
    create(discordId: string, username: string): Promise<boolean>;
    deleteById(id: number): Promise<boolean>;
    deleteByDiscordId(discordId: string): Promise<boolean>;
    deleteByUsername(username: string): Promise<boolean>;
}