import {
  DeleteMeal,
  DeleteMealInput,
} from "@/domain/application/usecases/delete-meal";
import { SignOut } from "@/domain/application/usecases/sign-out";
import { StartMealAdding } from "@/domain/application/usecases/start-meal-adding";
import { StartSupervision } from "@/domain/application/usecases/start-supervision";
import { inject, injectable } from "inversify";

@injectable()
export class StartSupervisionViewModel {
  @inject("StartSupervision") private startSupervision!: StartSupervision;
  @inject("SignOut") private signOut!: SignOut;
  @inject("DeleteMeal") private deleteMeal!: DeleteMeal;
  @inject("StartMealAdding") private _startMealAdding!: StartMealAdding;

  async start({ userId }: { userId: string }) {
    this.startSupervision.execute({ supervisedId: userId });
  }

  async logout() {
    this.signOut.execute();
  }

  async deleteMealById(data: DeleteMealInput) {
    this.deleteMeal.execute(data);
  }

  async startMealAdding() {
    this._startMealAdding.execute();
  }
}
