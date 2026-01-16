import { UserRepository } from "../infrastructure/repositories/UserRepository"

export class UserService {
	private userRepo: UserRepository = new UserRepository()

	getUserById = async (id: number) => {
		return await this.userRepo.getById(id);
	}
	
	getUserByDiscordId = async (discordId: string) => {
		return await this.userRepo.getByDiscordId(discordId);
	}
	
	getUserByUsername = async (username: string) => {
		return await this.userRepo.getByUsername(username);
	}
	
	getRoles = async (id: number) => {
		return await this.userRepo.getRoles(id);
	}
	
	createUser = async (discordId: string, username: string) => {
		return await this.userRepo.create(discordId, username);
		// TODO: ADD LOGIC (ANOTHER REPO FUNCTION) TO CHECK IF USER EXISTS
	}
	
	deleteUser = async (id: number) => {
		return await this.userRepo.delete(id);
	}
}