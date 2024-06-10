import { Authenticate } from "@/domain/application/usecases/authenticate";
import { inject } from "inversify";

export class IndexViewModel {
  constructor(
    @inject("Authenticate") private readonly authenticate: Authenticate
  ) {}

  async authenticateUser() {
    await this.authenticate.execute();
  }
}
