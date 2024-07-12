import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisedRepository {
  update(data: Supervised): Promise<void>;
}
