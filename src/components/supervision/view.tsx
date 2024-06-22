import { Pressable, Text, View } from "react-native";

export interface SupervisionViewProps {
  header: React.ReactNode;
  highlightedMetric: React.ReactNode;
  meals: React.ReactNode;
  startMealAdding: () => void;
}

export default function SupervisionView({
  header,
  highlightedMetric,
  meals,
  startMealAdding,
}: SupervisionViewProps) {
  return (
    <View>
      <View>{header}</View>
      <View>{highlightedMetric}</View>
      <View>
        <Text>Refeições</Text>
        <View>{meals}</View>
      </View>
      <View>
        <Pressable onPress={startMealAdding}>
          <Text>Adicionar refeição</Text>
        </Pressable>
      </View>
    </View>
  );
}
