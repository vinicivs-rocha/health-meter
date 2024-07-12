import { Supervised } from "@/domain/enterprise/entities/supervised";
import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import { Unauthenticated } from "../../enterprise/exceptions/unauthenticated";
import type { AuthenticationPresenter } from "../presenters/authentication";
import { SupervisedRepository } from "../repositories/supervised";

export type AuthenticateOutput = {
  supervised: Supervised;
};

@injectable()
export class Authenticate implements Usecase<[], AuthenticateOutput> {
  output!: AuthenticateOutput;
  @inject("SupervisedRepository")
  private readonly supervisedRepository!: SupervisedRepository;
  @inject("AuthenticationPresenter")
  private readonly authenticationPresenter!: AuthenticationPresenter;

  async execute() {
    try {
      this.output = {
        supervised: await this.supervisedRepository.findCurrent(),
      };

      await this.authenticationPresenter.presentAuthenticated(
        this.output.supervised
      );
    } catch (error) {
      if (error instanceof Unauthenticated) {
        await this.authenticationPresenter.presentUnauthenticated();
        return;
      }
      console.error(error);
    }
  }
}
