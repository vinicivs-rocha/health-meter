import { StartSupervision } from "@/domain/application/usecases/start-supervision";
import { inject, injectable } from "inversify";

@injectable()
export class StartSupervisionViewModel {
  constructor(
    @inject("StartSupervision") private startSupervision: StartSupervision
  ) {}
  async start({ userId }: { userId: string }) {
    this.startSupervision.execute({ supervisedId: userId });
  }
}
