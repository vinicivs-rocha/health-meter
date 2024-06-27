import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

interface MealProps {
  name: string;
  createdAt: Date;
  deleteMeal: (mealId: string) => void;
  startMealUpdating: (mealId: string) => void;
}

export default function Meal({
  name,
  createdAt,
  children,
}: PropsWithChildren<MealProps>) {
  return (
    <Animated.View style={styles.container}>
      <View style={styles.mealTitle}>
        <Text style={styles.mealName}>{name}</Text>
        <Text style={styles.mealCreationDate}>
          {createdAt.toLocaleTimeString("pt-BR", {
            timeStyle: `short`,
          })}
        </Text>
      </View>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: `white`,
    margin: 2,
    padding: 16,
    gap: 4,
    borderRadius: 8,
    shadowColor: `#00000040`,
    elevation: 24,
  },
  mealTitle: {
    flex: 1,
    flexDirection: `row`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },
  mealName: {
    fontSize: 16,
    fontFamily: `Poppins_600SemiBold`,
  },
  mealCreationDate: {
    fontSize: 12,
    fontFamily: `Poppins_600SemiBold`,
  },
});
