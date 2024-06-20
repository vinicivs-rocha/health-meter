import {
  MealData,
  MealRepository,
} from "@/domain/application/repositories/meal";
import { SupabaseClient } from "@supabase/supabase-js";
import { id, inject, injectable } from "inversify";

@injectable()
export class SupabaseMealRepository implements MealRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findById(id: string): Promise<MealData | null> {
    throw new Error("Method not implemented.");
  }

  async findAllBySupervised(supervisedId: string): Promise<MealData[]> {
    const { data, error } = await this.supabase
      .from("meals")
      .select("id, name")
      .eq("user_id", supervisedId);

    if (error) {
      throw error;
    }

    return data.map(({ id, name }) => ({
      id,
      name,
      nutrionalValues: [],
    }));
  }

  async findByIds(ids: string[]) {
    const { data, error } = await this.supabase
      .from("meals")
      .select("id, name")
      .in("id", ids);

    if (error) {
      throw error;
    }

    return data.map(({ id, name }) => ({
      id,
      name,
      nutrionalValues: [],
    }));
  }
}
