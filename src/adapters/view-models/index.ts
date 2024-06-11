import { Authenticate } from "@/domain/application/usecases/authenticate";
import { inject, injectable } from "inversify";

@injectable()
export class IndexViewModel {
  @inject("Authenticate") private readonly authenticate!: Authenticate;

  async authenticateUser() {
    await this.authenticate.execute();
  }
}
