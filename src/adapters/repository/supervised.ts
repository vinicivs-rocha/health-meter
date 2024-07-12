import { SupervisedRepository } from "@/domain/application/repositories/supervised";
import { Supervised } from "@/domain/enterprise/entities/supervised";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseSupervisedRepository implements SupervisedRepository {
  @inject("SupabaseClient") private supabase!: SupabaseClient;

  update(data: Supervised): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
