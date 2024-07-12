import { Entity } from "@core/entities/entity";
import { Optional } from "@core/types/optional";
import { Goal } from "../value-objects/goal";
import { TacoField } from "../value-objects/taco-field";

export type MetricProps = {
  name: string;
  tacoField: TacoField;
  goal: Goal;
  highlighted: boolean;
};

export class Metric extends Entity<MetricProps> {
  constructor(props: Optional<MetricProps, "highlighted">) {
    super({
      ...props,
      highlighted: props.highlighted ?? false,
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

  get highlighted(): boolean {
    return this.props.highlighted;
  }
}
