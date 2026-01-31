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
		// Here, the error is generic. Should be changed with the Error class story
		const exists = await this.existsById(id);
		if (!exists) {
			throw Error("User not found");
		}

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
		
		// This should be changed during the error class implementation story, and have the API either return a 404 or 204 status code.
		if (!exists) {
			throw Error("User not found");
		};

		return await this.userRepo.delete(id);
	}

	public async createUser(
		discordId: string,
		username: string
	) {
		const exists = await this.existsByDiscordId(discordId);
		
		// This should be changed to throw an error if a user already exists which would be handled in the upper layers of the appliation.
		// Ideally, if a user already exists, send a 202 (Accepted), 403 (Forbidden), and maybe 409 (Conflict) but for the purpose of security
		// I don't think that 409 should be used 
		if (exists) {
			throw Error("User already exists")
		}

		return await this.userRepo.create(discordId, username);
	}

	public async updateUser(
		id: number,
		change: IUserUpdateDto
	) {
		const exists = await this.existsById(id);

		// Again, an custom error should be thrown here. The status code is up to the discretion of whoever
		// is implementing the error class story
		if (!exists) {
			throw Error("User not found");
		};

		return await this.userRepo.update(id, change);
	}
}
