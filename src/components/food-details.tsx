import { Food } from "@/domain/enterprise/entities/food";
import { FlatList, Text, View } from "react-native";

export interface FoodDetailsProps {
  food: Food;
}

export default function FoodDetails(props: FoodDetailsProps) {
  return (
    <View>
      <Text>{props.food.name}</Text>
      <FlatList
        data={props.food.intakes}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.intake.toFixed(2)}g</Text>
              <Text>{item.metricId}</Text>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}
