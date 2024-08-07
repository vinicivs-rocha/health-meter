import { DeleteMealInput } from "@/domain/application/usecases/delete-meal";
import { SupervisionStore } from "@/stores/supervision";
import NoMealsDataIcon from "@assets/no-meals-data.svg";
import { observer } from "mobx-react-lite";
import { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MealProps } from "./meal";
import MealContent from "./meal-content";

export interface SupervisionMealsProps {
  Store: SupervisionStore;
  Meal: (props: OmitUppercase<PropsWithChildren<MealProps>>) => React.ReactNode;
  deleteMeal: (data: DeleteMealInput) => void;
  startMealUpdating: (mealId: string) => void;
}

function SupervisionMeals({
  Store,
  Meal,
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

  if (!Store.meals.length) {
    return (
      <View style={styles.container}>
        <NoMealsDataIcon width={350} height={350} />
        <Text style={styles.noMealsText}>Nenhuma refeição registrada hoje</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.mealsList}
        data={Store.meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { name, createdAt, id } }) => (
          <Meal
            id={id}
            name={name}
            createdAt={createdAt}
            deleteMeal={() =>
              deleteMeal({ mealId: id, supervisedId: Store.supervised!.id })
            }
            startMealUpdating={startMealUpdating}
          >
            <MealContent Store={Store} mealId={id} />
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
  noMealsText: {
    color: `#343A40`,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});

export default observer(SupervisionMeals);
