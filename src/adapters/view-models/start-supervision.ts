import { SignOut } from "@/domain/application/usecases/sign-out";
import { StartSupervision } from "@/domain/application/usecases/start-supervision";
import { inject, injectable } from "inversify";

@injectable()
export class StartSupervisionViewModel {
  @inject("StartSupervision") private startSupervision!: StartSupervision;
  @inject("SignOut") private signOut!: SignOut;

  async start({ userId }: { userId: string }) {
    this.startSupervision.execute({ supervisedId: userId });
  }

  async logout() {
    this.signOut.execute();
  }
}
