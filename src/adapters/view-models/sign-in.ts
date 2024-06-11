import { SignIn } from "@/domain/application/usecases/sign-in";
import { inject, injectable } from "inversify";

@injectable()
export class SignInViewModel {
  constructor(@inject("SignIn") private readonly signInUsecase: SignIn) {}

  async signIn(data: { email: string; password?: string }) {
    await this.signInUsecase.execute(data);
  }
}
