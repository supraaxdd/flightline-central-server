export type IdParameter = { id: number };
export type DiscordIdParameter = { discordId: string };
export type UsernameParameter = { username: string };
export type UserDataParameter = {
    discordId: string;
    username: string;
}
export type ControllerProfileUpdateParameter = {
    controllerSince?: Date;
    qualificationPositionId?: number;
}