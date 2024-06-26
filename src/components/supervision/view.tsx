import { Pressable, StyleSheet, Text, View } from "react-native";
import { SupervisionHeaderProps } from "./header";
import { SupervisionHighlightedMetricsProps } from "./highlighted-metrics";
import { SupervisionMealsProps } from "./meals";

export interface SupervisionViewProps {
  Header: (props: OmitUppercase<SupervisionHeaderProps>) => React.ReactNode;
  HighlightedMetrics: (
    props: OmitUppercase<SupervisionHighlightedMetricsProps>
  ) => React.ReactNode;
  Meals: (props: OmitUppercase<SupervisionMealsProps>) => React.ReactNode;
  startMealAdding: () => void;
  checkHistory: SupervisionHeaderProps["checkHistory"];
  logout: SupervisionHeaderProps["logout"];
  startMetricGoalChange: SupervisionHighlightedMetricsProps["startMetricGoalChange"];
  deleteMeal: SupervisionMealsProps["deleteMeal"];
  startMealUpdating: SupervisionMealsProps["startMealUpdating"];
}

export default function SupervisionView({
  Header,
  HighlightedMetrics,
  Meals,
  startMealAdding,
  checkHistory,
  logout,
  startMetricGoalChange,
  deleteMeal,
  startMealUpdating,
}: SupervisionViewProps) {
  return (
    <View>
      <View>
        <Header checkHistory={checkHistory} logout={logout} />
      </View>
      <View>
        <HighlightedMetrics startMetricGoalChange={startMetricGoalChange} />
      </View>
      <View style={styles.mealsContainer}>
        <Text style={styles.mealsText}>Refeições</Text>
        <View>
          <Meals deleteMeal={deleteMeal} startMealUpdating={startMealAdding} />
        </View>
      </View>
      <View>
        <Pressable onPress={startMealAdding}>
          <Text>Adicionar refeição</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealsContainer: {
    padding: 20,
  },
  mealsText: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
});
