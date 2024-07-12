import { Metric } from "@/domain/enterprise/entities/metric";

export interface MetricRepository {
  update(data: Metric): Promise<void>;
}
