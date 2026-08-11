import { AppError } from "./AppError";

export class ConflictError extends AppError {
	constructor(code: string, message: string, details?: Record<string, unknown>) {
		super(409, code, message, details);
	}
}
