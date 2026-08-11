import { AppError } from "./AppError";

export class NotFoundError extends AppError {
	constructor(code: string, message: string, details?: Record<string, unknown>) {
		super(404, code, message, details);
	}
}
