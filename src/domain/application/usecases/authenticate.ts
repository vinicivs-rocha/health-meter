import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import { Unauthenticated } from "../../enterprise/exceptions/unauthenticated";
import type {
  AuthenticationGateway,
  UserData,
} from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

export type AuthenticateOutput = {
  userData: UserData | null;
};

@injectable()
export class Authenticate implements Usecase<[], AuthenticateOutput> {
  output!: AuthenticateOutput;
  @inject("AuthenticationGateway")
  private readonly authenticationGateway!: AuthenticationGateway;
  @inject("AuthenticationPresenter")
  private readonly authenticationPresenter!: AuthenticationPresenter;

  async execute() {
    try {
      this.output = {
        userData: await this.authenticationGateway.getStoredUser(),
      };

      if (!this.output.userData) {
        throw new Unauthenticated();
      }

      await this.authenticationPresenter.presentAuthenticated(
        this.output.userData
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
