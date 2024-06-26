import {
  MealData,
  MealRepository,
} from "@/domain/application/repositories/meal";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseMealRepository implements MealRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findById(id: string): Promise<MealData | null> {
    throw new Error("Method not implemented.");
  }

  async findAllBySupervised(supervisedId: string): Promise<MealData[]> {
    const { data, error } = await this.supabase
      .from("meals")
      .select("id, name, created_at")
      .eq("user_id", supervisedId);

    if (error) {
      throw error;
    }

    return data.map(({ id, name, created_at }) => ({
      id,
      name,
      createdAt: new Date(created_at),
      nutrionalValues: [],
    }));
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
      nutrionalValues: [],
    }));
  }
}
