import {
  SupervisedData,
  SupervisedMetricUpatingData,
  SupervisedRepository,
} from "@/domain/application/repositories/supervised";
import { FetchFailed } from "@/domain/enterprise/exceptions/fetch-failed";
import { Goal } from "@/domain/enterprise/value-objects/goal";
import { Metric } from "@/domain/enterprise/value-objects/metric";
import { SupabaseClient } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";

@injectable()
export class SupabaseSupervisedRepository implements SupervisedRepository {
  @inject("SupabaseClient") private readonly supabase!: SupabaseClient;

  async findById(id: string): Promise<SupervisedData> {
    const {
      data: { session },
      error: sessionError,
    } = await this.supabase.auth.getSession();

    if (sessionError) {
      throw sessionError;
    }

    if (!session) throw new FetchFailed("Session not found");

    const { data: metricsData, error: metricsError } = await this.supabase
      .from("metrics")
      .select(
        "id, name, goal, intake, highlighted, taco_fields (unit, field_name)"
      )
      .eq("user_id", id);

    if (metricsError) throw metricsError;

    const highlightedMetric = metricsData.find((metric) => metric.highlighted);
    const highlightedMetricTacoField =
      highlightedMetric?.taco_fields as unknown as {
        unit: string;
        field_name: string;
      };

    const metrics = metricsData.map((metric: (typeof metricsData)[0]) => {
      const { field_name, unit } = metric.taco_fields as unknown as {
        unit: string;
        field_name: string;
      };
      return new Metric(
        metric.id,
        metric.name,
        field_name,
        unit,
        new Goal(metric.goal),
        metric.intake
      );
    });

    return {
      id,
      name: session.user.user_metadata.name,
      photo: session.user.user_metadata.picture,
      highlightedMetric: new Metric(
        highlightedMetric?.id,
        highlightedMetric?.name,
        highlightedMetricTacoField.field_name,
        highlightedMetricTacoField.unit,
        new Goal(highlightedMetric?.goal),
        highlightedMetric?.intake
      ),
      metrics,
    };
  }

  async updateMetric(data: SupervisedMetricUpatingData): Promise<void> {
    const { error } = await this.supabase
      .from("metrics")
      .update({
        name: data.metric.name,
        goal: data.metric.goal.value,
        intake: data.metric.intake,
      })
      .eq("id", data.metric.id)
      .eq("user_id", data.supervisedId);

    if (error) throw error;
  }
}
