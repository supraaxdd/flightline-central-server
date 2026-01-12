import { IRole } from "./IRole";

export interface IUser {
    id: number;
    discord_id: string;
    username: string;
    roles: IRole[];
}