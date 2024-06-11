import { UserData } from "@/domain/application/gateways/authentication";
import { AuthenticationPresenter } from "@/domain/application/presenters/authentication";
import { Router } from "@/types";
import { router } from "expo-router";
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
  presentAuthenticated(userData: UserData): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
