import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
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
  const scale = useSharedValue(1);

  const addMealButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Tap()
    .onBegin(() => {
      scale.value = withTiming(0.95, {
        duration: 50,
      });
    })
    .onFinalize(() => {
      scale.value = withTiming(1, { duration: 50 });
      runOnJS(startMealAdding)();
    });

  return (
    <View style={styles.container}>
      <View>
        <Header checkHistory={checkHistory} logout={logout} />
      </View>
      <View>
        <HighlightedMetrics startMetricGoalChange={startMetricGoalChange} />
      </View>
      <View style={styles.mealsContainer}>
        <Text style={styles.mealsText}>Refeições</Text>
        <View style={styles.mealsListContainer}>
          <Meals
            deleteMeal={deleteMeal}
            startMealUpdating={startMealUpdating}
          />
        </View>
      </View>
      <View style={styles.addMealContainer}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[styles.addMealButton, addMealButtonAnimatedStyle]}
            onLayout={(event) => console.log(event.nativeEvent.layout.height)}
          >
            <MaterialIcons name="add" size={28} color="#343A40" />
            <Text style={styles.addMealButtonText}>Adicionar refeição</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealsContainer: {
    flex: 1,
    gap: 12,
  },
  mealsText: {
    padding: 20,
    paddingBottom: 0,
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  mealsListContainer: {
    flex: 1,
  },
  addMealContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: StatusBar.currentHeight,
    paddingRight: 20,
  },
  addMealButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: "#FDE047",
    borderRadius: 8,
    gap: 12,
  },
  addMealButtonText: {
    marginTop: 3,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#343A40",
  },
});
