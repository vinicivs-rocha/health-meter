import { inject, injectable } from "inversify";
import { Usecase } from "../../../core/usecases/usecase";
import { Unauthenticated } from "../../enterprise/exceptions/unauthenticated";
import { AuthenticationGateway } from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

export type AuthenticateOutput = {};

@injectable()
export class Authenticate implements Usecase<[], AuthenticateOutput> {
  output!: AuthenticateOutput;
  @inject("AuthenticationGateway")
  private readonly AuthenticationGateway!: AuthenticationGateway;
  @inject("AuthenticationPresenter")
  private readonly authenticationPresenter!: AuthenticationPresenter;

  async execute() {
    try {
      const isAuthenticated =
        await this.AuthenticationGateway.isAuthenticated();
      if (isAuthenticated) {
        throw new Unauthenticated();
      }
      await this.authenticationPresenter.presentAuthenticated();
    } catch (error) {
      if (error instanceof Unauthenticated) {
        await this.authenticationPresenter.presentUnauthenticated();
        return;
      }
      console.error(error);
    }
  }
}
