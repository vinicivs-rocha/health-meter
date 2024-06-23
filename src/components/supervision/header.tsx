import { SupervisionStore } from "@/stores/supervision";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Bone from "../bone";

export interface SupervisionHeaderProps {
  Store: SupervisionStore;
  checkHistory: () => void;
  logout: () => void;
}

function Skeleton() {
  return (
    <>
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

function SupervisionHeader({
  Store,
  checkHistory,
  logout,
}: SupervisionHeaderProps) {
  if (Store.supervisedLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        colors={["#EAB308", "#FDE047"]}
        style={styles.container}
      >
        <View style={styles.userDataContainer}>
          <Image
            source={{ uri: Store.supervised?.photo }}
            style={styles.userProfilePicture}
          ></Image>
          <View style={styles.titleContainer}>
            <Text style={styles.greettingText}>Olá,</Text>
            <Text style={styles.greettingName}>{Store.supervised?.name}</Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <Pressable onPress={checkHistory}>
            <MaterialIcons
              name="history"
              size={20}
              color={"68717A"}
              disabled={true}
            />
          </Pressable>
          <Pressable onPress={logout}>
            <MaterialIcons
              name="exit-to-app"
              size={20}
              color={"68717A"}
              disabled={true}
            />
          </Pressable>
        </View>
      </LinearGradient>
    </>
  );
}

export default observer(SupervisionHeader);

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 20,
    paddingTop: (StatusBar.currentHeight ?? 10) + 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  userDataContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  userProfilePicture: { width: 40, height: 40, borderRadius: 8 },
  titleContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  greettingText: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#343A40",
  },
  greettingName: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#343A40",
    marginTop: -12,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
  },
});
