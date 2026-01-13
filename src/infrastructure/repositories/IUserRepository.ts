import { IUser } from "../models/IUser";

export interface IUserRepository {
    getUserById(id: number): Promise<IUser | null>;
    getUserByDiscordId(discordId: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    getUserWithRolesById(id: number): Promise<IUser | null>;
    getUserWithRolesByDiscordId(discordId: string): Promise<IUser | null>
    getUserWithRolesByUsername(username: string): Promise<IUser | null>
    createUser(discordId: string, username: string): Promise<boolean>;
    deleteUserById(id: number): Promise<boolean>;
    deleteUserByDiscordId(discordId: string): Promise<boolean>;
    deleteUserByUsername(username: string): Promise<boolean>;
}