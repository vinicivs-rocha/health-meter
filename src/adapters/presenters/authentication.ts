import { AuthenticationPresenter } from "@/domain/application/presenters/authentication";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { Router } from "@/types";
import { inject, injectable } from "inversify";

@injectable()
export class ExpoAuthenticationPresenter implements AuthenticationPresenter {
  @inject("ExpoRouter") private readonly router!: Router;

  presentError(message: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async presentUnauthenticated(): Promise<void> {
    this.router.replace("/sign-in");
  }
  async presentAuthenticated({ id }: Supervised): Promise<void> {
    this.router.replace({ pathname: `supervision/${id}` });
  }
}
