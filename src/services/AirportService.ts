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

	public async createAirport(name: string) {
		// See if an exists check is possible here (by name)		
		return await this.airportRepo.create(name);
	}

	public async deleteAirport(id: number) {
		const exists = await this.exists(id);

		if (!exists) return true;
		return await this.airportRepo.delete(id);
	}

}