import { SupervisionStore } from "@/stores/supervision";
import { observer } from "mobx-react-lite";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Meal from "./meal";
import MealContent from "./meal-content";

export interface SupervisionMealsProps {
  Store: SupervisionStore;
  deleteMeal: (mealId: string) => void;
  startMealUpdating: (mealId: string) => void;
}

function SupervisionMeals({
  Store,
  deleteMeal,
  startMealUpdating,
}: SupervisionMealsProps) {
  if (Store.mealsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={`#FDE047`} size={50} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.mealsList}
        data={Store.meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { name, createdAt, id, metricIntakes } }) => (
          <Meal
            id={id}
            name={name}
            createdAt={createdAt}
            deleteMeal={deleteMeal}
            startMealUpdating={startMealUpdating}
          >
            <MealContent
              intake={
                metricIntakes
                  .filter(
                    ({ metricId }) =>
                      metricId === Store.supervised?.highlightedMetric.id
                  )
                  .at(0)?.intake ?? 0
              }
              highlightedMetricUnit={Store.supervised?.highlightedMetric.unit}
              loading={Store.supervisedLoading || Store.mealsLoading}
            />
          </Meal>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: `center`,
    justifyContent: `center`,
  },
  mealsList: {
    width: `100%`,
  },
});

export default observer(SupervisionMeals);
