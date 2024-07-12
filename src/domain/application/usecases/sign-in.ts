import { Supervised } from "@/domain/enterprise/entities/supervised";
import { inject, injectable } from "inversify";
import type { Usecase } from "../../../core/usecases/usecase";
import type { AuthenticationGateway } from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";
import { SupervisedRepository } from "../repositories/supervised";

export type SignInOutput = {
  supervised: Supervised;
};

@injectable()
export class SignIn implements Usecase<[], SignInOutput> {
  output!: SignInOutput;

  constructor(
    @inject("AuthenticationGateway")
    private readonly authenticationGateway: AuthenticationGateway,
    @inject("SupervisedRepository")
    private readonly supervisedRepository: SupervisedRepository,
    @inject("AuthenticationPresenter")
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async execute() {
    try {
      await this.authenticationGateway.signIn(),
        (this.output = {
          supervised: await this.supervisedRepository.findCurrent(),
        });

      this.authenticationPresenter.presentAuthenticated(this.output.supervised);
    } catch (error) {
      console.error(error);
    }
  }
}
