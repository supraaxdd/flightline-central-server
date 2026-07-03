import { AppError } from "./AppError";

export class BadRequestError extends AppError {
	constructor(code: string, message: string, details?: Record<string, unknown>) {
		super(400, code, message, details);
	}
}
