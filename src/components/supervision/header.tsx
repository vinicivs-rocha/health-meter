import { SupervisionStore } from "@/stores/supervision";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import React from "react";
import { StyleSheet, View } from "react-native";
import Bone from "../bone";

interface SupervisionHeaderProps {
  store: SupervisionStore;
}

function Skeleton() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#FDE047" translucent={true} />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#EAB308", "#FDE047"]}
        style={styles.container}
      >
        <View style={styles.userDataContainer}>
          <Bone style={styles.userProfilePicture}></Bone>
          <Bone style={styles.titleContainer}></Bone>
        </View>
        <View style={styles.actionsContainer}>
          <MaterialIcons
            name="history"
            size={20}
            color={"68717A"}
            disabled={true}
          />
          <MaterialIcons
            name="exit-to-app"
            size={20}
            color={"68717A"}
            disabled={true}
          />
        </View>
      </LinearGradient>
    </>
  );
}

function SupervisionHeader({ store }: SupervisionHeaderProps) {
  if (store.supervisedLoading) {
    return <Skeleton />;
  }

  return <View></View>;
}

export default observer(SupervisionHeader);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userDataContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  userProfilePicture: { width: 35, height: 35, borderRadius: 8 },
  titleContainer: {
    flex: 1,
    borderRadius: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
