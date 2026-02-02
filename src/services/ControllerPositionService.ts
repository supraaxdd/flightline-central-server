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

	public async exists(id: number) {
		return await this.positionRepo.exists(id);
	}
}