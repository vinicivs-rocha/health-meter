import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { randomUUID } from "expo-crypto";
import { Intake } from "../value-objects/intake";
import { TacoField } from "../value-objects/taco-field";

export type FoodProps = {
  id: string;
  name: string;
  amount: number;
  intakes: Intake[];
};

export class Food extends Entity<FoodProps> {
  constructor(props: Optional<FoodProps, "id">) {
    super({
      ...props,
      id: props.id ?? randomUUID(),
    });
  }

  addIntake(name: string, tacoField: TacoField, baseValue: number): void {
    this.props.intakes.push(
      new Intake(name, tacoField, baseValue * this.props.amount)
    );
  }
}
