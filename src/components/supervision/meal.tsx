import { SupervisionStore } from "@/stores/supervision";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withClamp,
  withDecay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export interface MealProps {
  id: string;
  name: string;
  createdAt: Date;
  deleteMeal: () => void;
  startMealUpdating: (mealId: string) => void;
  Store: SupervisionStore;
}

function Meal({
  id,
  name,
  createdAt,
  children,
  deleteMeal,
  startMealUpdating,
  Store,
}: PropsWithChildren<MealProps>) {
  const x = useSharedValue(100);
  const containerOpacity = useSharedValue(1);
  const [containerHeight, setContainerHeight] = useState(0);

  const containerAnimatedStyles = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const mealContainerAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const menuAnimatedStyles = useAnimatedStyle(() => ({
    width: Math.max(Math.abs(x.value) + 10, 60),
    opacity: Math.abs(x.value / 50),
  }));

  if (Store.getMealDeletionLoadingState(id)) {
    x.value = withTiming(0, { duration: 200 });
    containerOpacity.value = withTiming(0.5, { duration: 200 });
  }
  const gesture = Gesture.Pan()
    .onChange(({ changeX }) => {
      if (x.value + changeX >= 0) return (x.value = 0);
      x.value += changeX;
    })
    .onFinalize(({ velocityX }) => {
      x.value = withClamp(
        {
          max: 0,
          min: -300,
        },
        withDecay({
          velocity: velocityX,
          deceleration: 0.998,
          clamp: [-50, 0],
          velocityFactor: 0.4,
          rubberBandEffect: true,
          rubberBandFactor: 1,
          reduceMotion: ReduceMotion.System,
        })
      );
    });

  useEffect(() => {
    x.value = withSpring(0, {
      damping: 100,
      duration: 2000 as unknown as undefined,
    });
  }, []);

  return (
    <Animated.View
      style={[styles.container, containerAnimatedStyles]}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        setContainerHeight(height - 8);
      }}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            styles.mealContainer,
            mealContainerAnimatedStyles,
            Store.getMealDeletionLoadingState(id) &&
              Platform.select({
                ios: {
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                },
                android: {
                  elevation: 0,
                },
              }),
          ]}
        >
          <Pressable onPress={() => startMealUpdating(id)}>
            <View style={styles.mealTitle}>
              <Text style={styles.mealName}>{name}</Text>
              <Text style={styles.mealCreationDate}>
                {createdAt.toLocaleTimeString("pt-BR", {
                  timeStyle: `short`,
                })}
              </Text>
            </View>
            {children}
          </Pressable>
        </Animated.View>
      </GestureDetector>
      <Animated.View
        style={[
          styles.deleteButtonContainer,
          menuAnimatedStyles,
          { height: containerHeight },
        ]}
      >
        <Pressable style={styles.deleteButton} onPress={() => deleteMeal()}>
          <MaterialIcons name="delete" size={24} color="#343A40" />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mealContainer: {
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 8,
    backgroundColor: `white`,
    padding: 16,
    gap: 4,
    borderRadius: 8,
    shadowColor: `#000000bf`,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
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
    color: `#343A40`,
  },
  mealCreationDate: {
    fontSize: 12,
    fontFamily: `Poppins_600SemiBold`,
    color: "#343A40",
  },
  deleteButtonContainer: {
    position: `absolute`,
    top: 0,
    right: 20,
    backgroundColor: `#FECACA`,
    justifyContent: `center`,
    alignItems: `center`,
    borderRadius: 8,
    zIndex: -1,
  },
  deleteButton: {
    flex: 1,
    width: `100%`,
    justifyContent: `center`,
    alignItems: `center`,
  },
});

export default observer(Meal);
