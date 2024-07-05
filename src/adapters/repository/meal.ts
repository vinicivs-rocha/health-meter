import {
  MealData,
  MealDeletionData,
  MealRepository,
} from "@/domain/application/repositories/meal";
import { MetricIntake } from "@/domain/enterprise/value-objects/metric-intake";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseMealRepository implements MealRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findById(id: string): Promise<MealData | null> {
    throw new Error("Method not implemented.");
  }

  async findAllBySupervised(supervisedId: string): Promise<MealData[]> {
    const { data: mealsData, error: mealsError } = await this.supabase
      .from("meals")
      .select("id, name, created_at")
      .eq("user_id", supervisedId);

    if (mealsError) {
      throw mealsError;
    }

    return await Promise.all(
      mealsData.map(async ({ id, name, created_at }) => {
        const { data: nutrionalValuesData, error: nutrionalValuesError } =
          await this.supabase
            .from("meal_metrics")
            .select("intake, metric_id")
            .eq("meal_id", id);

        if (nutrionalValuesError) {
          throw nutrionalValuesError;
        }

        return {
          id,
          name,
          createdAt: new Date(created_at),
          metricIntakes: nutrionalValuesData.map(
            ({ intake, metric_id }) => new MetricIntake(metric_id, intake)
          ),
        };
      })
    );
  }

  async findByIds(ids: string[]) {
    const { data, error } = await this.supabase
      .from("meals")
      .select("id, name, created_at")
      .in("id", ids);

    if (error) {
      throw error;
    }

    return data.map(({ id, name, created_at }) => ({
      id,
      name,
      createdAt: new Date(created_at),
      metricIntakes: [],
    }));
  }

  async delete(data: MealDeletionData): Promise<void> {
    await this.supabase.from("meals").delete().eq("id", data.mealId);
  }
}
