import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisedRepository {
  findById(id: string): Promise<Supervised>;
  update(data: Supervised): Promise<void>;
}
