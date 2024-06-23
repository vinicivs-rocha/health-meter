import { SupervisionStore } from "@/stores/supervision";
import { MaterialIcons } from "@expo/vector-icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Bone from "../bone";

export interface SupervisionHighlightedMetricsProps {
  Store: SupervisionStore;
  startMetricGoalChange: () => void;
}

function Skeleton() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.metricCointainer}>
        <View>
          <MaterialIcons name="analytics" size={15} color={"#343A40"} />
          <Bone style={styles.metricText} />
        </View>
        <Bone style={styles.metricNumber} />
      </Pressable>
      <View style={[styles.metricCointainer, { backgroundColor: "#FEF08A66" }]}>
        <View>
          <MaterialIcons name="fastfood" size={15} color={"#343A40"} />
          <Bone style={styles.metricText} />
        </View>
        <Bone style={styles.metricNumber} />
      </View>
    </View>
  );
}

function SupervisionHighlightedMetrics({}: SupervisionHighlightedMetricsProps) {
  return <Skeleton />;
}

export default observer(SupervisionHighlightedMetrics);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: "row",
    gap: 8,
  },
  metricCointainer: {
    backgroundColor: "#FDE047",
    borderRadius: 8,
    gap: 4,
  },
  metricText: {
    width: "100%",
    height: 20,
  },
  metricNumber: {
    width: "100%",
    height: 30,
  },
});
