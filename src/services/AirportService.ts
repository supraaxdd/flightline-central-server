import { AirportRepository } from "../infrastructure/repositories/AirportRepository";

export class AirportService {
	private static instance?: AirportService;
	private airportRepo = AirportRepository.getInstance();

	private constructor() { };

	public static getInstance() {
		if (!AirportService.instance) {
			AirportService.instance = new AirportService();
		}

		return AirportService.instance;
	}

	public async getById(id: number) {
		return await this.airportRepo.getById(id);
	}

	public async getByName(name: string) {
		return await this.airportRepo.getByName(name);
	}

	public async exists(id: number) {
		return await this.airportRepo.exists(id);
	}
}