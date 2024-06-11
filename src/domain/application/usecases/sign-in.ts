import { inject, injectable } from "inversify";
import type { Usecase } from "../../../core/usecases/usecase";
import type {
  AuthenticationGateway,
  UserData,
} from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

type Input = {
  email: string;
  password?: string;
};

export type SignInOutput = {
  userData: UserData;
};

@injectable()
export class SignIn implements Usecase<Input, SignInOutput> {
  output!: SignInOutput;

  constructor(
    @inject("AuthenticationGateway")
    private readonly authenticationGateway: AuthenticationGateway,
    @inject("AuthenticationPresenter")
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async execute(input: Input) {
    try {
      this.output = {
        userData: await this.authenticationGateway.signIn(input),
      };

      this.authenticationPresenter.presentAuthenticated(this.output.userData);
    } catch (error) {
      console.error(error);
    }
  }
}
