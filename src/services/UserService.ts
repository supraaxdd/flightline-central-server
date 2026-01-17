import { UserRepository } from "../infrastructure/repositories/UserRepository"

export class UserService {
	private userRepo: UserRepository = new UserRepository()

	getUserById = async (id: number) => await this.userRepo.getById(id);
	
	getUserByDiscordId = async (discordId: string) => await this.userRepo.getByDiscordId(discordId);
	
	getUserByUsername = async (username: string) => await this.userRepo.getByUsername(username);
	
	getRoles = async (id: number) => await this.userRepo.getRoles(id);

	existsById = async (id: number) => await this.userRepo.existsById(id);
	
	existsByDiscordId = async (discordId: string) => await this.userRepo.existsByDiscordId(discordId);
	
	deleteUser = async (id: number) => {
		const exists = this.existsById(id);
		if (!exists) return true;

		return await this.userRepo.delete(id);
	}

	createUser = async (discordId: string, username: string) => {
		const exists = this.existsByDiscordId(discordId);
		if (!exists) return false;

		return await this.userRepo.create(discordId, username);
	}
	
}
