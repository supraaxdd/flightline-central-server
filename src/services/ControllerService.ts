import { IControllerUpdateDto } from "../infrastructure/dtos/IControllerUpdateDto";
import { ControllerRepository } from "../infrastructure/repositories/ControllerRepository";

export class ControllerService {
    private static instance?: ControllerService;

    private constructor() { };

    public static getInstance = () => {
        if (!ControllerService.instance) {
            ControllerService.instance = new ControllerService();
        }

        return ControllerService.instance;
    }

    private controllerRepo: ControllerRepository = ControllerRepository.getInstance();

    public async getByUserId(id: number) {
        return await this.controllerRepo.getByUserId(id);
    }

    public async createController(id: number) {
        return await this.controllerRepo.create(id, new Date());
    }

    public async deleteController(id: number) {
        return await this.controllerRepo.delete(id);
    }

    public async updateController(
        id: number,
        controllerChange: IControllerUpdateDto
    ) {
        return await this.controllerRepo.update(id, controllerChange);
    }
}

