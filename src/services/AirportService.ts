import { ErrorCode, NotFoundError } from "../infrastructure/errors";
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

	public async getAll() {
		return await this.airportRepo.getAll();
	}

	public async exists(id: number) {
		return await this.airportRepo.exists(id);
	}

	public async resolveAirport(identifier: string) {
		const asNumber = Number(identifier);
		if (!Number.isNaN(asNumber) && Number.isInteger(asNumber)) {
			const byId = await this.getById(asNumber);
			if (byId) return byId;
		}

		return await this.getByName(identifier);
	}

	public async resolveAirportOrThrow(identifier: string) {
		const airport = await this.resolveAirport(identifier);
		if (!airport) {
			throw new NotFoundError(ErrorCode.AIRPORT_NOT_FOUND, "Airport not found", { airport: identifier });
		}

		return airport;
	}
}
