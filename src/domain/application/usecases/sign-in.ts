import { inject, injectable } from "inversify";
import type { Usecase } from "../../../core/usecases/usecase";
import type {
  AuthenticationGateway,
  UserData,
} from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

export type SignInOutput = {
  userData: UserData;
};

@injectable()
export class SignIn implements Usecase<[], SignInOutput> {
  output!: SignInOutput;

  constructor(
    @inject("AuthenticationGateway")
    private readonly authenticationGateway: AuthenticationGateway,
    @inject("AuthenticationPresenter")
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async execute() {
    try {
      this.output = {
        userData: await this.authenticationGateway.signIn(),
      };

      this.authenticationPresenter.presentAuthenticated(this.output.userData);
    } catch (error) {
      console.error(error);
    }
  }
}
