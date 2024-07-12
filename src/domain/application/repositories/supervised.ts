import { Supervised } from "@/domain/enterprise/entities/supervised";

export interface SupervisedRepository {
  findCurrent(): Promise<Supervised>;
  update(data: Supervised): Promise<void>;
}
