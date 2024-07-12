import { Entity } from "@core/entities/entity";
import { Goal } from "../value-objects/goal";
import { TacoField } from "../value-objects/taco-field";

export type MetricProps = {
  name: string;
  tacoField: TacoField;
  goal: Goal;
};

export class Metric extends Entity<MetricProps> {
  constructor(props: MetricProps) {
    super({
      ...props,
    });
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
}
