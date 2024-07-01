import { MealData } from "@/domain/application/repositories/meal";
import { SupervisionStore } from "@/stores/supervision";
import { observer } from "mobx-react-lite";
import { StyleSheet, Text } from "react-native";
import Bone from "../bone";

interface MealContentProps {
  Store: SupervisionStore;
  mealId: string;
}

function MealContent({ Store, mealId }: MealContentProps) {
  const loading = Store.mealsLoading || Store.supervisedLoading;
  if (loading) return <Bone style={styles.container} />;

  const meal = Store.meals
    .filter((meal) => meal.id === mealId)
    .at(0) as MealData;
  const intake =
    meal.metricIntakes
      .filter(
        (intake) => intake.metricId === Store.supervised?.highlightedMetric.id
      )
      .at(0)?.intake ?? 0;
  const highlightedMetricUnit = Store.supervised?.highlightedMetric.unit ?? "";

  return (
    <Text style={styles.container}>
      {intake.toFixed(0)} {highlightedMetricUnit}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: "20%",
    fontFamily: `Poppins_400Regular`,
    color: `#68717A`,
    borderRadius: 8,
  },
});

export default observer(MealContent);
