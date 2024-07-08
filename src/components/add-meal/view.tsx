import { MealStore } from "@/stores/meal";
import { MaterialIcons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import FoodDetails from "../food-details";

export interface AddMealViewProps {
  Store: MealStore;
}

export default function AddMealView({ Store }: AddMealViewProps) {
  return (
    <View>
      <Text>Adicionando uma refeição</Text>
      <View>
        <View>
          <Text>Consumo de</Text>
          <TextInput placeholder={Store.defaultMealName} />
        </View>
        <View>
          <Text>Alimentos</Text>
          <FlatList
            data={Store.foods}
            renderItem={({ item, index }) => {
              return <FoodDetails food={item} key={index} />;
            }}
          ></FlatList>
          <Pressable>
            <MaterialIcons name="add" size={16} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
      <Pressable>
        <Text>Adicionar</Text>
      </Pressable>
    </View>
  );
}
