import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { randomUUID } from "expo-crypto";
import { Intake } from "../value-objects/intake";
import { Metric } from "./metric";

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

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get amount(): number {
    return this.props.amount;
  }

  get intakes(): Intake[] {
    return this.props.intakes;
  }

  addIntake(metric: Metric, baseValue: number): void {
    this.props.intakes.push(
      new Intake(
        metric.id,
        metric.name,
        metric.tacoField,
        baseValue * this.props.amount
      )
    );
  }

  getMetricIntake(metricId: string): number {
    return (
      this.props.intakes.find((intake) => intake.metricId === metricId)
        ?.value ?? 0
    );
  }
}
