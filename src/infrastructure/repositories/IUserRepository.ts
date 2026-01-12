import { IUser } from "../models/IUser";

export interface IUserRepository {
    getUserById(id: number): Promise<IUser | null>;
    getUserByDiscordId(discordId: string): Promise<IUser | null>;
    getUserByUsername(username: string): Promise<IUser | null>;
    createUser(): void;
    deleteUserById(id: number): void;
    deleteUserByDiscordId(discordId: string): void;
    deleteUserByUsername(username: string): void;
}