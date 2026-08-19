# API Endpoints & Errors

Reference for all HTTP routes exposed by the Flightline Central Server, including success responses and typed errors returned via the centralized error middleware.

## Introduction

- **Base URL prefix:** `/api`
- **Error middleware:** [`src/middleware/errorHandler.ts`](../src/middleware/errorHandler.ts)

### Error response shape

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable message",
  "details": {}
}
```

- `details` is omitted when not provided.
- **Global fallback:** any endpoint may return `500` / `INTERNAL_SERVER_ERROR` for unexpected (non-`AppError`) failures.

### GET behavior note

Read endpoints (`getUserById`, `getEventById`, etc.) currently return `200` with `null` when a record is not found — they do **not** throw `NotFoundError`. Only mutating endpoints enforce typed errors today.

### Request parameters

- **Path parameters** are required segments in the URL (e.g. `:id`).
- **Body parameters** apply to `PUT` requests and must be sent as JSON (`Content-Type: application/json`).
- For **update** endpoints (`PUT`), the resource identifier is always in the path. Individual body fields are optional, but **at least one body field should be provided** for the request to perform a meaningful update. The API does not currently reject an empty body.

---

## Users

**Router:** [`src/routes/UserRouter.ts`](../src/routes/UserRouter.ts)  
**Base path:** `/api/users`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/users/getById/:id` | getUserById | `200` — user object or `null` |
| GET | `/api/users/getByDiscordId/:discordId` | getUserByDiscordId | `200` — user object or `null` |
| GET | `/api/users/getByUsername/:username` | getUserByUsername | `200` — user object or `null` |
| GET | `/api/users/getRoles/:id` | getRoles | `200` — roles array |
| POST | `/api/users/:discordId/:username` | createUser | `201` — created user |
| DELETE | `/api/users/:id` | deleteUser | `200` — delete result |
| PUT | `/api/users/:id` | updateUser | `200` — update result |

### Parameters

#### GET `/api/users/getById/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id |

#### GET `/api/users/getByDiscordId/:discordId`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `discordId` | string | Yes | Discord user id |

#### GET `/api/users/getByUsername/:username`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `username` | string | Yes | Username |

#### GET `/api/users/getRoles/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id |

#### POST `/api/users/:discordId/:username`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `discordId` | string | Yes | Discord user id for the new user |
| Path | `username` | string | Yes | Username for the new user |

No request body.

#### DELETE `/api/users/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id |

No request body.

#### PUT `/api/users/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id |
| Body | `discordId` | string | No | New Discord user id |
| Body | `username` | string | No | New username |

At least one body field (`discordId` or `username`) should be provided.

### Errors

**Source:** [`src/services/UserService.ts`](../src/services/UserService.ts)

#### GET `/api/users/getRoles/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `USER_NOT_FOUND` | User not found | `{ userId }` | User id does not exist |

#### POST `/api/users/:discordId/:username`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 409 | `USER_ALREADY_EXISTS` | User already exists | — | Discord ID is already registered |

#### DELETE `/api/users/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `USER_NOT_FOUND` | User not found | `{ userId }` | User id does not exist |

#### PUT `/api/users/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `USER_NOT_FOUND` | User not found | `{ userId }` | User id does not exist |

---

## Controllers

**Router:** [`src/routes/ControllerRouter.ts`](../src/routes/ControllerRouter.ts)  
**Base path:** `/api/controllers`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/controllers/:id` | getControllerById | `200` — controller object or `null` |
| POST | `/api/controllers/:id` | createController | `201` — created controller |
| DELETE | `/api/controllers/:id` | deleteController | `200` — delete result |
| PUT | `/api/controllers/:id` | updateController | `200` — update result |

### Parameters

#### GET `/api/controllers/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id (controller is keyed by user id) |

#### POST `/api/controllers/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id to create a controller profile for |

No request body.

#### DELETE `/api/controllers/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id (controller is keyed by user id) |

No request body.

#### PUT `/api/controllers/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | User id (controller is keyed by user id) |
| Body | `controllerSince` | Date (ISO 8601 string) | No | Date the user became a controller |
| Body | `qualificationPositionId` | number | No | Id of the controller's qualification position |

At least one body field (`controllerSince` or `qualificationPositionId`) should be provided.

### Errors

**Source:** [`src/services/ControllerService.ts`](../src/services/ControllerService.ts)

All controller errors include `details: { userId }` where `userId` is the `:id` route parameter.

#### POST `/api/controllers/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 409 | `CONTROLLER_ALREADY_EXISTS` | Controller already exists | `{ userId }` | Controller profile already exists for user |
| 404 | `USER_NOT_FOUND` | User not found to become a controller | `{ userId }` | User does not exist |

#### DELETE `/api/controllers/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_NOT_FOUND` | Controller not found | `{ userId }` | Controller profile does not exist |

#### PUT `/api/controllers/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_NOT_FOUND` | Controller not found | `{ userId }` | Controller profile does not exist |

---

## Events

**Router:** [`src/routes/EventRouter.ts`](../src/routes/EventRouter.ts)  
**Base path:** `/api/events`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/events/active` | getActiveEvents | `200` — events array or `null` |
| GET | `/api/events/:id` | getEventById | `200` — event object or `null` |
| GET | `/api/events/getEventsHostedByUserById/:id` | getEventsHostedByUserById | `200` — events array or `null` |
| POST | `/api/events/:hostId/:dateHosted` | createEvent | `200` — create result |
| PUT | `/api/events/:id` | updateEvent | `200` — update result |
| DELETE | `/api/events/:id` | deleteEvent | `200` — delete result |

### Parameters

#### GET `/api/events/active`

No path or body parameters. Returns all events where `active = 1` as an array of `{ id, dateHosted, controllerCount }`, or `null` if none.

#### GET `/api/events/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Event id |

#### GET `/api/events/getEventsHostedByUserById/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Host user id |

#### POST `/api/events/:hostId/:dateHosted`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `hostId` | number | Yes | User id of the event host |
| Path | `dateHosted` | Date (ISO 8601 string) | Yes | Date the event is hosted |

No request body.

#### DELETE `/api/events/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Event id |

No request body.

#### PUT `/api/events/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Event id |
| Body | `hostId` | number | No | New host user id |
| Body | `dateHosted` | Date (ISO 8601 string) | No | New event date |
| Body | `active` | boolean | No | Whether the event is active |

At least one body field (`hostId`, `dateHosted`, or `active`) should be provided.

### Errors

**Source:** [`src/services/EventService.ts`](../src/services/EventService.ts)

#### POST `/api/events/:hostId/:dateHosted`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `USER_NOT_FOUND` | Host User not found | `{ userId }` | Host user does not exist |
| 403 | `INSUFFICIENT_ROLE` | Host user does not have permission to host events | `{ userId, requiredRole: "Event Host" }` | Host user lacks Event Host role |

#### DELETE `/api/events/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `EVENT_NOT_FOUND` | Event not found | `{ eventId }` | Event does not exist |

#### PUT `/api/events/:id`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `EVENT_NOT_FOUND` | Event not found | `{ eventId }` | Event does not exist |
| 404 | `USER_NOT_FOUND` | Host user not found | `{ userId }` | `hostId` provided in request body and user does not exist |
| 403 | `INSUFFICIENT_ROLE` | Host user does not have permission to host events | `{ userId, requiredRole: "Event Host" }` | `hostId` provided in body and user lacks Event Host role |

---

## Event Controller Attendees

**Router:** [`src/routes/EventControllerAttendeeRouter.ts`](../src/routes/EventControllerAttendeeRouter.ts)  
**Base path:** `/api/eca`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/eca/:eventId/:userId` | getController | `200` — assignment object or `null` |
| POST | `/api/eca/:eventId/:userId/:airport/:position` | createControllerAssignment | `200` — create result |
| PUT | `/api/eca/:eventId/:userId` | updateControllerAssignment | `200` — update result |
| DELETE | `/api/eca/:eventId/:userId` | deleteControllerAssignment | `200` — delete result |

### Parameters

#### GET `/api/eca/:eventId/:userId`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `eventId` | number | Yes | Event id |
| Path | `userId` | number | Yes | User id (controller attendee) |

#### POST `/api/eca/:eventId/:userId/:airport/:position`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `eventId` | number | Yes | Event id |
| Path | `userId` | number | Yes | User id (controller to assign) |
| Path | `airport` | string | Yes | Airport id or ICAO name (e.g. `KJFK` or `3`) |
| Path | `position` | string | Yes | Position id or name (e.g. `Tower` or `3`) |

No request body. Airport and position are resolved server-side by id first, then by name.

#### DELETE `/api/eca/:eventId/:userId`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `eventId` | number | Yes | Event id |
| Path | `userId` | number | Yes | User id (controller attendee) |

No request body.

#### PUT `/api/eca/:eventId/:userId`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `eventId` | number | Yes | Event id |
| Path | `userId` | number | Yes | User id (controller attendee) |
| Body | `airportId` | number | No | New airport id for the assignment |
| Body | `positionId` | number | No | New controller position id for the assignment |
| Body | `airport` | string | No | New airport id or ICAO name (takes precedence over `airportId`) |
| Body | `position` | string | No | New position id or name (takes precedence over `positionId`) |

At least one body field should be provided. If both `airportId` and `airport` (or `positionId` and `position`) are supplied, the string identifier wins.

### Errors

**Source:** [`src/services/EventControllerAttendeeService.ts`](../src/services/EventControllerAttendeeService.ts)

#### POST `/api/eca/:eventId/:userId/:airport/:position`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 409 | `CONTROLLER_ASSIGNMENT_ALREADY_EXISTS` | Controller Assignment already exists for this event | `{ eventId, userId }` | Assignment already exists |
| 404 | `EVENT_NOT_FOUND` | Event not found | `{ eventId }` | Event does not exist |
| 404 | `USER_NOT_FOUND` | User not found | `{ userId }` | User does not exist |
| 403 | `INSUFFICIENT_ROLE` | User does not have permission to be a controller | `{ userId, requiredRole: "Controller" }` | User lacks Controller role |
| 404 | `AIRPORT_NOT_FOUND` | Airport not found | `{ airport }` | Airport identifier could not be resolved |
| 404 | `POSITION_NOT_FOUND` | Position not found | `{ position }` | Position identifier could not be resolved |
| 404 | `CONTROLLER_NOT_FOUND` | Controller not found | `{ userId }` | User has no controller profile |
| 403 | `INSUFFICIENT_QUALIFICATION` | Controller does not have the required qualification for this position | `{ userId, positionId, qualificationId }` | Controller qualification is below required position |

#### PUT `/api/eca/:eventId/:userId`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_ASSIGNMENT_NOT_FOUND` | Controller Assignment not found | `{ eventId, userId }` | Assignment does not exist |
| 404 | `AIRPORT_NOT_FOUND` | Airport not found | `{ airport }` or `{ airportId }` | Airport identifier could not be resolved or does not exist |
| 404 | `POSITION_NOT_FOUND` | Position not found | `{ position }` or `{ positionId }` | Position identifier could not be resolved or does not exist |
| 403 | `INSUFFICIENT_QUALIFICATION` | Controller does not have the required qualification for this position | `{ userId, positionId, qualificationId }` | Position change requires higher qualification |

#### DELETE `/api/eca/:eventId/:userId`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_ASSIGNMENT_NOT_FOUND` | Controller Assignment not found | `{ eventId, userId }` | Assignment does not exist |

---

## Airports

**Router:** [`src/routes/AirportRouter.ts`](../src/routes/AirportRouter.ts)  
**Base path:** `/api/airports`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/airports/getById/:id` | getAirportById | `200` — airport object or `null` |
| GET | `/api/airports/getByName/:name` | getAirportByName | `200` — airport object or `null` |
| GET | `/api/airports/getAll` | getAllAirports | `200` — airport array (empty if none) |
| GET | `/api/airports/resolve/:identifier` | resolveAirport | `200` — airport object or `null` |

### Parameters

#### GET `/api/airports/getById/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Airport id |

#### GET `/api/airports/getByName/:name`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `name` | string | Yes | ICAO code (e.g. `KJFK`) |

#### GET `/api/airports/getAll`

No parameters.

#### GET `/api/airports/resolve/:identifier`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `identifier` | string | Yes | Numeric id or ICAO name; id is tried first for numeric strings |

---

## Positions

**Router:** [`src/routes/ControllerPositionRouter.ts`](../src/routes/ControllerPositionRouter.ts)  
**Base path:** `/api/positions`

| Method | Path | Handler | Success |
|--------|------|---------|---------|
| GET | `/api/positions/getById/:id` | getPositionById | `200` — position object or `null` |
| GET | `/api/positions/getByName/:name` | getPositionByName | `200` — position object or `null` |
| GET | `/api/positions/getAll` | getAllPositions | `200` — position array (empty if none) |
| GET | `/api/positions/resolve/:identifier` | resolvePosition | `200` — position object or `null` |

### Parameters

#### GET `/api/positions/getById/:id`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `id` | number | Yes | Position id |

#### GET `/api/positions/getByName/:name`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `name` | string | Yes | Position name (e.g. `Tower`) |

#### GET `/api/positions/getAll`

No parameters.

#### GET `/api/positions/resolve/:identifier`

| Location | Name | Type | Required | Description |
|----------|------|------|----------|-------------|
| Path | `identifier` | string | Yes | Numeric id or position name; id is tried first for numeric strings |

---

## Error code quick reference

**Source:** [`src/infrastructure/errors/ErrorCode.ts`](../src/infrastructure/errors/ErrorCode.ts)

| Code | HTTP |
|------|------|
| `AIRPORT_NOT_FOUND` | 404 |
| `CONTROLLER_ALREADY_EXISTS` | 409 |
| `CONTROLLER_ASSIGNMENT_ALREADY_EXISTS` | 409 |
| `CONTROLLER_ASSIGNMENT_NOT_FOUND` | 404 |
| `CONTROLLER_NOT_FOUND` | 404 |
| `EVENT_NOT_FOUND` | 404 |
| `INSUFFICIENT_QUALIFICATION` | 403 |
| `INSUFFICIENT_ROLE` | 403 |
| `INTERNAL_SERVER_ERROR` | 500 |
| `POSITION_NOT_FOUND` | 404 |
| `USER_ALREADY_EXISTS` | 409 |
| `USER_NOT_FOUND` | 404 |

---

## Maintenance

Update this file whenever routes, request parameters, or service-layer throws change. Future unit tests can cross-check error codes programmatically; this document remains the human and Postman reference for expected API responses.
