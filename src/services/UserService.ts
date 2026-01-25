import { IUserUpdateDto } from "../infrastructure/dtos/IUserUpdateDto";
import { UserRepository } from "../infrastructure/repositories/UserRepository"

export class UserService {
	private static instance?: UserService;

	private constructor() { };

	public static getInstance() {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}

		return UserService.instance;
	}

	private userRepo: UserRepository = UserRepository.getInstance();

	public async getUserById(id: number) {
		return await this.userRepo.getById(id);
	}
	
	public async getUserByDiscordId(discordId: string) {
		return await this.userRepo.getByDiscordId(discordId);
	}
	
	public async getUserByUsername(username: string) {
		return await this.userRepo.getByUsername(username);
	}
	
	public async getRoles(id: number) {
		return await this.userRepo.getRoles(id);
	}

	public async existsById(id: number) {
		return await this.userRepo.existsById(id);
	}
	
	public async existsByDiscordId(discordId: string) {
		return await this.userRepo.existsByDiscordId(discordId);
	}
	
	public async deleteUser(id: number) {
		const exists = await this.existsById(id);
		if (!exists) return true;

		return await this.userRepo.delete(id);
	}

	public async createUser(
		discordId: string,
		username: string
	) {
		const exists = await this.existsByDiscordId(discordId);
		if (!exists) return false;

		return await this.userRepo.create(discordId, username);
	}

	public async updateUser(
		id: number,
		change: IUserUpdateDto
	) {
		return await this.userRepo.update(id, change);
	}
}
