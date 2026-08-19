import { IControllerUpdateDto } from "../infrastructure/dtos/IControllerUpdateDto";
import { IEventControllerAttendeeUpdateDto } from "../infrastructure/dtos/IEventControllerAttendeeUpdateDto";
import { IEventUpdateDto } from "../infrastructure/dtos/IEventUpdateDto";
import { IUserUpdateDto } from "../infrastructure/dtos/IUserUpdateDto";

export type IdParameter = { id: number };

export type DiscordIdParameter = { discordId: string };

export type UsernameParameter = { username: string };

export type NameParameter = { name: string };

export type IdentifierParameter = { identifier: string };

export type UserDataParameter = Required<IUserUpdateDto>;

export type UserUpdateParameter = Partial<IUserUpdateDto>;

export type ControllerProfileUpdateParameter = Partial<IControllerUpdateDto>;

export type EventCreateParameter = Required<IEventUpdateDto>;

export type EventUpdateParameter = Partial<IEventUpdateDto>;

export type EventControllerAttendeeUpdateParameter = Partial<Pick<IEventControllerAttendeeUpdateDto, "airportId" | "positionId" | "airport" | "position">>;

export type EventControllerAttendeeCreationParameter = {
	eventId: number;
	userId: number;
	airport: string;
	position: string;
};

export type EventControllerAttendeeIdParameter = Required<Pick<IEventControllerAttendeeUpdateDto, "eventId" | "userId">>