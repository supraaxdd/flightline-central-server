import { Request, Response, NextFunction } from "express";
import { AppError, ErrorCode } from "../infrastructure/errors";

export function errorHandler(err: unknown, _req: Request, res: Response, next: NextFunction) {
	void next;
	console.error(err);

	if (err instanceof AppError) {
		const body: Record<string, unknown> = {
			error: err.code,
			message: err.message,
		};

		if (err.details !== undefined) {
			body.details = err.details;
		}

		return res.status(err.statusCode).json(body);
	}

	if (err instanceof Error) {
		return res.status(500).json({
			error: ErrorCode.INTERNAL_SERVER_ERROR,
			message: err.message,
		});
	}

	return res.status(500).json({
		error: ErrorCode.INTERNAL_SERVER_ERROR,
		message: "Something went wrong",
	});
}
