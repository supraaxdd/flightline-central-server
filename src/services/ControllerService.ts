import { IControllerUpdateDto } from "../infrastructure/dtos/IControllerUpdateDto";
import { ConflictError, ErrorCode, NotFoundError } from "../infrastructure/errors";
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
        if (controllerExists) {
            throw new ConflictError(ErrorCode.CONTROLLER_ALREADY_EXISTS, "Controller already exists", { userId: id });
        }

        const userExists = await this.userService.existsById(id);
        if (!userExists) {
            throw new NotFoundError(ErrorCode.USER_NOT_FOUND, "User not found to become a controller", { userId: id });
        }

        return await this.controllerRepo.create(id, new Date());
    }

    public async deleteController(id: number) {
        const exists = await this.existsByUserId(id);
        if (!exists) {
            throw new NotFoundError(ErrorCode.CONTROLLER_NOT_FOUND, "Controller not found", { userId: id });
        }

        return await this.controllerRepo.delete(id);
    }

    public async updateController(
        id: number,
        controllerChange: IControllerUpdateDto
    ) {
        const exists = await this.existsByUserId(id);
        if (!exists) {
            throw new NotFoundError(ErrorCode.CONTROLLER_NOT_FOUND, "Controller not found", { userId: id });
        }

        return await this.controllerRepo.update(id, controllerChange);
    }
}
