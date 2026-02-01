import { IControllerUpdateDto } from "../infrastructure/dtos/IControllerUpdateDto";
import { ControllerRepository } from "../infrastructure/repositories/ControllerRepository";
import { UserService } from "./UserService";

export class ControllerService {
    private static instance?: ControllerService;

    private constructor() { };

    public static getInstance() {
        if (!ControllerService.instance) {
            ControllerService.instance = new ControllerService();
        }

        return ControllerService.instance;
    }

    private controllerRepo: ControllerRepository = ControllerRepository.getInstance();
    private userService: UserService = UserService.getInstance();

    public async getByUserId(id: number) {
        return await this.controllerRepo.getByUserId(id);
    }

    public async existsByUserId(id: number) {
        return await this.controllerRepo.existsByUserId(id);
    }

    public async createController(id: number) {
        const controllerExists = await this.existsByUserId(id);
        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (controllerExists) {
            throw Error("Controller already exists");
        }

        const userExists = await this.userService.existsById(id);
        if (!userExists) {
            throw Error("User not found to become a controller");
        }

        return await this.controllerRepo.create(id, new Date());
    }

    public async deleteController(id: number) {
        const exists = await this.existsByUserId(id);
        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (!exists) {
            throw Error("Controller not found")
        }

        return await this.controllerRepo.delete(id);
    }

    public async updateController(
        id: number,
        controllerChange: IControllerUpdateDto
    ) {
        const exists = await this.existsByUserId(id);
        // Future implementation of the error class story... ref. User/Event services for more in depth explanations
        if (!exists) {
            throw Error("Controller not found");
        }

        return await this.controllerRepo.update(id, controllerChange);
    }
}

