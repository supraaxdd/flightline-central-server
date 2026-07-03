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
| GET | `/api/events/:id` | getEventById | `200` — event object or `null` |
| GET | `/api/events/getEventsHostedByUserById/:id` | getEventsHostedByUserById | `200` — events array or `null` |
| POST | `/api/events/:hostId/:dateHosted` | createEvent | `200` — create result |
| PUT | `/api/events/:id` | updateEvent | `200` — update result |
| DELETE | `/api/events/:id` | deleteEvent | `200` — delete result |

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
| POST | `/api/eca/:eventId/:userId/:airportId/:positionId` | createControllerAssignment | `200` — create result |
| PUT | `/api/eca/:eventId/:userId` | updateControllerAssignment | `200` — update result |
| DELETE | `/api/eca/:eventId/:userId` | deleteControllerAssignment | `200` — delete result |

### Errors

**Source:** [`src/services/EventControllerAttendeeService.ts`](../src/services/EventControllerAttendeeService.ts)

#### POST `/api/eca/:eventId/:userId/:airportId/:positionId`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 409 | `CONTROLLER_ASSIGNMENT_ALREADY_EXISTS` | Controller Assignment already exists for this event | `{ eventId, userId }` | Assignment already exists |
| 404 | `EVENT_NOT_FOUND` | Event not found | `{ eventId }` | Event does not exist |
| 404 | `USER_NOT_FOUND` | User not found | `{ userId }` | User does not exist |
| 403 | `INSUFFICIENT_ROLE` | User does not have permission to be a controller | `{ userId, requiredRole: "Controller" }` | User lacks Controller role |
| 404 | `AIRPORT_NOT_FOUND` | Airport not found | `{ airportId }` | Airport does not exist |
| 404 | `POSITION_NOT_FOUND` | Position not found | `{ positionId }` | Position does not exist |
| 404 | `CONTROLLER_NOT_FOUND` | Controller not found | `{ userId }` | User has no controller profile |
| 403 | `INSUFFICIENT_QUALIFICATION` | Controller does not have the required qualification for this position | `{ userId, positionId, qualificationId }` | Controller qualification is below required position |

#### PUT `/api/eca/:eventId/:userId`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_ASSIGNMENT_NOT_FOUND` | Controller Assignment not found | `{ eventId, userId }` | Assignment does not exist |
| 404 | `AIRPORT_NOT_FOUND` | Airport not found | `{ airportId }` | `airportId` provided in request body and airport does not exist |
| 404 | `POSITION_NOT_FOUND` | Position not found | `{ positionId }` | `positionId` provided in request body and position does not exist |

#### DELETE `/api/eca/:eventId/:userId`

| Status | Code | Message | Details | Condition |
|--------|------|---------|---------|-----------|
| 404 | `CONTROLLER_ASSIGNMENT_NOT_FOUND` | Controller Assignment not found | `{ eventId, userId }` | Assignment does not exist |

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

Update this file whenever routes or service-layer throws change. Future unit tests can cross-check error codes programmatically; this document remains the human and Postman reference for expected API responses.
