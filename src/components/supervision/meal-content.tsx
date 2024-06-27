import { StyleSheet, Text } from "react-native";
import Bone from "../bone";

interface MealContentProps {
  loading: boolean;
  intake: number;
  highlightedMetricUnit?: string;
}

export default function MealContent({
  loading,
  intake,
  highlightedMetricUnit,
}: MealContentProps) {
  if (loading) return <Bone style={styles.container} />;

  return (
    <Text style={styles.container}>
      {intake.toFixed(0)} {highlightedMetricUnit}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "50%",
    fontFamily: `Poppins_400Regular`,
  },
});
