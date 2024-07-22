import { MetricRepository } from "@/domain/application/repositories/metric";
import { Metric } from "@/domain/enterprise/entities/metric";
import { Goal } from "@/domain/enterprise/value-objects/goal";
import { TacoField } from "@/domain/enterprise/value-objects/taco-field";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseMetricRepository implements MetricRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findHighlightedInIds(ids: string[]): Promise<Metric | null> {
    const { data, error } = await this.supabase
      .from("metrics")
      .select("id, taco_fields(unit, field_name), name, highlighted, goal")
      .in("id", ids)
      .eq("highlighted", true)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const { field_name: tacoFieldName, unit: tacoFieldUnit } =
      data.taco_fields as any;

    return (
      data &&
      new Metric({
        id: data.id,
        name: data.name,
        highlighted: data.highlighted,
        tacoField: new TacoField(tacoFieldName, tacoFieldUnit),
        goal: new Goal(data.goal),
      })
    );
  }

  update(data: Metric): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
