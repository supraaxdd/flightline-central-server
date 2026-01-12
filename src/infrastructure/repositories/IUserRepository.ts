import { IUser } from "../models/IUser";

export interface IUserRepository {
    getUserById(id: number): IUser;
    getUserByDiscordId(discordId: string): IUser;
    getUserByUsername(username: string): IUser;
    createUser(): void;
    deleteUserById(id: number): void;
    deleteUserByDiscordId(discordId: string): void;
    deleteUserByUsername(username: string): void;
}