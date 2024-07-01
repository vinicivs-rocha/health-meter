import { inject, injectable } from "inversify";
import type { Usecase } from "../../../core/usecases/usecase";
import type { AuthenticationGateway } from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

@injectable()
export class SignOut implements Usecase<[], undefined> {
  output: undefined;

  @inject("AuthenticationGateway")
  private readonly authenticationGateway!: AuthenticationGateway;
  @inject("AuthenticationPresenter")
  private readonly authenticationPresenter!: AuthenticationPresenter;

  async execute(): Promise<void> {
    try {
      await this.authenticationGateway.signOut();
      await this.authenticationPresenter.presentUnauthenticated();
    } catch (error) {
      console.error(error);
    }
  }
}
