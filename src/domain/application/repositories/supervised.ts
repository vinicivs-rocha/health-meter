import type { Metric } from "../../enterprise/value-objects/metric";

export type SupervisedData = {
  id: string;
  name: string;
  photo: string;
  highlightedMetric: Metric;
  metrics: Metric[];
};

export interface SupervisedRepository {
  findById(id: string): Promise<SupervisedData>;
}
