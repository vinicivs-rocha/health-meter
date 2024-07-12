import { Metric } from "@/domain/enterprise/entities/metric";

export interface MetricRepository {
  findHighlightedInIds(ids: string[]): Promise<Metric | null>;
  update(data: Metric): Promise<void>;
}
