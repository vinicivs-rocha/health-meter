import { SupervisionStore } from "@/stores/supervision";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Bone from "../bone";
import WaveProgress from "./wave";

export interface SupervisionHighlightedMetricsProps {
  Store: SupervisionStore;
  startMetricGoalChange: () => void;
}

function Skeleton() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.metricCointainer}>
        <View style={styles.metricTitleContainer}>
          <MaterialIcons name="analytics" size={15} color={"#343A40"} />
          <Bone style={styles.metricText} />
        </View>
        <Bone style={styles.metricNumber} />
      </Pressable>
      <View style={[styles.metricCointainer, { backgroundColor: "#FEF08A66" }]}>
        <View style={styles.metricTitleContainer}>
          <MaterialIcons name="fastfood" size={15} color={"#343A40"} />
          <Bone style={styles.metricText} />
        </View>
        <Bone style={styles.metricNumber} />
      </View>
    </View>
  );
}

function SupervisionHighlightedMetrics({
  Store,
  startMetricGoalChange,
}: SupervisionHighlightedMetricsProps) {
  const [metricContainerWidth, setMetricContainerWidth] = useState(0);
  const [metricContainerHeight, setMetricContainerHeight] = useState(0);

  if (Store.supervisedLoading) return <Skeleton />;

  const highlightedMetric = Store.supervised!.highlightedMetric;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setMetricContainerWidth(width);
    setMetricContainerHeight(height);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.metricCointainer}
        onPress={startMetricGoalChange}
      >
        <View style={styles.metricTitleContainer}>
          <MaterialIcons name="analytics" size={15} color={"#343A40"} />
          <Text style={styles.metricText}>
            Meta de {highlightedMetric?.name.toLocaleLowerCase()}
          </Text>
        </View>
        <Text style={styles.metricNumber}>{highlightedMetric?.goal.value}</Text>
      </Pressable>
      <View
        style={[styles.metricCointainer, { backgroundColor: "transparent" }]}
        onLayout={handleLayout}
      >
        <View style={styles.metricTitleContainer}>
          <MaterialIcons name="fastfood" size={15} color={"#343A40"} />
          <Text style={styles.metricText}>
            Consumo de {highlightedMetric?.name.toLocaleLowerCase()}
          </Text>
          <Text style={styles.metricNumber}>{highlightedMetric?.intake}</Text>
          <WaveProgress
            height={metricContainerHeight}
            width={metricContainerWidth}
            progress={10}
          />
        </View>
      </View>
    </View>
  );
}

export default observer(SupervisionHighlightedMetrics);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    gap: 12,
  },
  metricCointainer: {
    backgroundColor: "#FDE047",
    borderRadius: 8,
    gap: 4,
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
    padding: 8,
  },
  metricTitleContainer: {
    width: "100%",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    width: "100%",
    height: 20,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#343A40",
  },
  metricNumber: {
    width: "50%",
    height: 30,
    borderRadius: 4,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#343A40",
  },
  metricFiller: {
    position: "absolute",
    bottom: -8,
    left: -8,
    backgroundColor: "#FDE047",
    zIndex: -1,
  },
});
