import { SupervisionStore } from "@/stores/supervision";
import { observer } from "mobx-react-lite";
import { StyleSheet, View } from "react-native";

interface SupervisionHeaderProps {
  store: SupervisionStore;
}

function SupervisionHeader({ store }: SupervisionHeaderProps) {
  if (true) {
    return <View></View>;
  }

  return <View></View>;
}

export default observer(SupervisionHeader);

const styles = StyleSheet.create({
  headerTitle: {
    width: "100%",
    height: 50,
  },
});
