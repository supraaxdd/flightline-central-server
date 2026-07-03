import { AppError } from "./AppError";

export class ForbiddenError extends AppError {
	constructor(code: string, message: string, details?: Record<string, unknown>) {
		super(403, code, message, details);
	}
}
