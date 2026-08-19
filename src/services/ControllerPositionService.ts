import { ErrorCode, NotFoundError } from "../infrastructure/errors";
import { ControllerPositionRepository } from "../infrastructure/repositories/ControllerPositionRepository";

export class ControllerPositionService {
	private static instance?: ControllerPositionService;
	private positionRepo = ControllerPositionRepository.getInstance();

	private constructor() { };

	public static getInstance() {
		if (!ControllerPositionService.instance) {
			ControllerPositionService.instance = new ControllerPositionService();
		}

		return ControllerPositionService.instance;
	}

	public async getById(id: number) {
		return await this.positionRepo.getById(id);
	}

	public async getByName(name: string) {
		return await this.positionRepo.getByName(name);
	}

	public async getAll() {
		return await this.positionRepo.getAll();
	}

	public async exists(id: number) {
		return await this.positionRepo.exists(id);
	}

	public async resolvePosition(identifier: string) {
		const asNumber = Number(identifier);
		if (!Number.isNaN(asNumber) && Number.isInteger(asNumber)) {
			const byId = await this.getById(asNumber);
			if (byId) return byId;
		}

		return await this.getByName(identifier);
	}

	public async resolvePositionOrThrow(identifier: string) {
		const position = await this.resolvePosition(identifier);
		if (!position) {
			throw new NotFoundError(ErrorCode.POSITION_NOT_FOUND, "Position not found", { position: identifier });
		}

		return position;
	}
}
