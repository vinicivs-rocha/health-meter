import type { Usecase } from "../../../core/usecases/usecase";
import type { AuthenticationGateway } from "../gateways/authentication";
import type { AuthenticationPresenter } from "../presenters/authentication";

export class SignOut implements Usecase<[], undefined> {
  output: undefined;

  constructor(
    private readonly authenticationGateway: AuthenticationGateway,
    private readonly authenticationPresenter: AuthenticationPresenter
  ) {}

  async execute(): Promise<void> {
    try {
      await this.authenticationGateway.signOut();
      await this.authenticationPresenter.presentUnauthenticated();
    } catch (error) {
      console.error(error);
    }
  }
}
