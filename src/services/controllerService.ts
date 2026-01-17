import { ControllerRepository } from "../infrastructure/repositories/ControllerRepository";

export class ControllerService {
    private controllerRepo: ControllerRepository = new ControllerRepository();

    getByUserId = async (id: number) => await this.controllerRepo.getByUserId(id);

    createController = async (id: number) => await this.controllerRepo.create(id, new Date());

    deleteController = async (id: number) => await this.controllerRepo.delete(id);

    updateController = async (id: number) => await this.controllerRepo.update(id);
}

