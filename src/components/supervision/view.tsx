import { Pressable, Text, View } from "react-native";
import { SupervisionHeaderProps } from "./header";
import { SupervisionHighlightedMetricsProps } from "./highlighted-metrics";

export interface SupervisionViewProps {
  Header: (props: OmitUppercase<SupervisionHeaderProps>) => React.ReactNode;
  HighlightedMetrics: (
    props: OmitUppercase<SupervisionHighlightedMetricsProps>
  ) => React.ReactNode;
  Meals: React.ReactNode;
  startMealAdding: () => void;
  checkHistory: SupervisionHeaderProps["checkHistory"];
  logout: SupervisionHeaderProps["logout"];
  startMetricGoalChange: SupervisionHighlightedMetricsProps["startMetricGoalChange"];
}

export default function SupervisionView({
  Header,
  HighlightedMetrics,
  Meals,
  startMealAdding,
  checkHistory,
  logout,
  startMetricGoalChange,
}: SupervisionViewProps) {
  return (
    <View>
      <View>
        <Header checkHistory={checkHistory} logout={logout} />
      </View>
      <View>
        <HighlightedMetrics startMetricGoalChange={startMetricGoalChange} />
      </View>
      <View>
        <Text>Refeições</Text>
        <View>{Meals}</View>
      </View>
      <View>
        <Pressable onPress={startMealAdding}>
          <Text>Adicionar refeição</Text>
        </Pressable>
      </View>
    </View>
  );
}
