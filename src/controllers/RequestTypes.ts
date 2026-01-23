export type IdParameter = { id: number };
export type DiscordIdParameter = { discordId: string };
export type UsernameParameter = { username: string };

export type UserDataParameter = {
    discordId: string;
    username: string;
}

export type UserUpdateParameter = {
    discordId?: string;
    username?: string;
}

export type ControllerProfileUpdateParameter = {
    controllerSince?: Date;
    qualificationPositionId?: number;
}

export type EventCreateParameter = {
    hostId: number;
    dateHosted: Date;
}

export type EventUpdateParameter = { 
    hostId?: number;
    dateHosted?: Date;
}

export type EventControllerAttendeeUpdateParameter = {
    airportId?: number;
    positionId?: number;
}

export type EventControllerAttendeeCreationParameter = {
    eventId: number,
    userId: number,
    airportId: number,
    positionId: number
}

export type EventControllerAttendeeIdParameter = {
    eventId: number,
    userId: number
}