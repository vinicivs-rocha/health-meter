import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { randomUUID } from "expo-crypto";
import { Goal } from "../value-objects/goal";
import { TacoField } from "../value-objects/taco-field";

export type MetricProps = {
  id: string;
  name: string;
  tacoField: TacoField;
  goal: Goal;
  highlighted: boolean;
};

export class Metric extends Entity<MetricProps> {
  constructor(props: Optional<MetricProps, "highlighted" | "id">) {
    super({
      ...props,
      highlighted: props.highlighted ?? false,
      id: props.id ?? randomUUID(),
    });
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get tacoField(): TacoField {
    return this.props.tacoField;
  }

  get goal(): Goal {
    return this.props.goal;
  }

  get highlighted(): boolean {
    return this.props.highlighted;
  }
}
