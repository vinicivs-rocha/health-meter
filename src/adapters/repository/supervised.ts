import { SupervisedRepository } from "@/domain/application/repositories/supervised";
import { Food } from "@/domain/enterprise/entities/food";
import { Meal } from "@/domain/enterprise/entities/meal";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { Unauthenticated } from "@/domain/enterprise/exceptions/unauthenticated";
import { Intake } from "@/domain/enterprise/value-objects/intake";
import { TacoField } from "@/domain/enterprise/value-objects/taco-field";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseSupervisedRepository implements SupervisedRepository {
  @inject("SupabaseClient") private supabase!: SupabaseClient;

  async findCurrent(): Promise<Supervised> {
    const { data: userData, error: userError } =
      await this.supabase.auth.getUser();
    if (userError) {
      throw new Unauthenticated();
    }
    const { user } = userData as { user: User };

    const { data: metricsData, error: metricsError } = await this.supabase
      .from("metrics")
      .select("id")
      .eq("user_id", user.id);
    if (metricsError) {
      throw new Error(metricsError.message);
    }

    const { data: mealsData, error: mealsError } = await this.supabase
      .from("meals")
      .select("id, name, created_at")
      .eq("user_id", user.id);
    if (mealsError) {
      throw new Error(mealsError.message);
    }

    const { data: foodsData, error: foodsError } = await this.supabase
      .from("foods")
      .select("id, name, amount, meal_id")
      .in(
        "meal_id",
        mealsData.map((meal) => meal.id)
      );
    if (foodsError) {
      throw new Error(foodsError.message);
    }

    const { data: intakesData, error: intakesError } = await this.supabase
      .from("intakes")
      .select("metrics(name, taco_fields(field_name, unit)), value");
    if (intakesError) {
      throw new Error(intakesError.message);
    }

    return new Supervised({
      id: user.id,
      name: user.user_metadata.name,
      photo: user.user_metadata.avatar_url,
      metrics: metricsData.map((metric) => metric.id as string),
      meals: mealsData.map(
        ({ id, name, created_at }) =>
          new Meal({
            id,
            name,
            createdAt: created_at,
            foods: foodsData
              .filter((food) => food.meal_id === id)
              .map(
                ({ id, name, amount }) =>
                  new Food({
                    id,
                    name,
                    amount,
                    intakes: intakesData.map(
                      ({
                        metrics: [
                          {
                            name,
                            taco_fields: [{ field_name, unit }],
                          },
                        ],
                        value,
                      }) =>
                        new Intake(name, new TacoField(field_name, unit), value)
                    ),
                  })
              ),
          })
      ),
    });
  }

  async deleteMeal(mealId: string): Promise<void> {
    await this.supabase.from("meals").delete().eq("id", mealId);
  }
}
