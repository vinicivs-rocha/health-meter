import { Supervised } from "@/domain/enterprise/entities/supervised";
import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import type { SupervisionPresenter } from "../presenters/supervision";
import type { SupervisedRepository } from "../repositories/supervised";

export type StartSupervisionOutput = {
  supervised: Supervised;
};

@injectable()
export class StartSupervision implements Usecase<[], StartSupervisionOutput> {
  output!: StartSupervisionOutput;

  @inject("SupervisedRepository")
  private supervisedRepository!: SupervisedRepository;
  @inject("SupervisionPresenter")
  private supervisionPresenter!: SupervisionPresenter;

  async execute() {
    try {
      const supervised = await this.supervisedRepository.findCurrent();

      this.supervisionPresenter.presentSupervised(supervised);
    } catch (error) {
      console.error(error);
    }
  }
}
