import {
  SupervisedData,
  SupervisedRepository,
} from "@/domain/application/repositories/supervised";
import { Metric } from "@/domain/enterprise/value-objects/nutrient";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseSupervisedRepository implements SupervisedRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findById(id: string): Promise<SupervisedData | null> {
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    const { data: metricsData, error: metricsError } = await this.supabase
      .from("metrics")
      .select("name, goal, intake, highlighted, taco_fields (unit, field_name)")
      .eq("user_id", id);

    if (metricsError) throw metricsError;

    const highlightedMetric = metricsData.find((metric) => metric.highlighted);

    const metrics = metricsData.map((metric: (typeof metricsData)[0]) => {
      const { field_name, unit } = metric.taco_fields as unknown as {
        unit: string;
        field_name: string;
      };
      return new Metric(
        metric.name,
        field_name,
        unit,
        metric.goal,
        metric.intake
      );
    });

    const { data: mealIds, error: mealIdsError } = await this.supabase
      .from("meals")
      .select("id")
      .eq("user_id", id);

    if (mealIdsError) throw mealIdsError;

    return (
      session && {
        id,
        name: session.user.user_metadata.name,
        photo: session.user.user_metadata.picture,
        highlightedGoal: highlightedMetric?.goal,
        highlightedIntake: highlightedMetric?.intake,
        metrics,
        mealIds: mealIds.map((meal: (typeof mealIds)[0]) => meal.id),
      }
    );
  }
}
