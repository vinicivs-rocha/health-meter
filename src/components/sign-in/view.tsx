import SignInIcon from "@assets/box-arrow-right.svg";
import Illustration from "@assets/lunch-time.svg";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SignInViewProps {
  login: () => Promise<void>;
}

export default function SignInView({ login }: SignInViewProps) {
  return (
    <View style={styles.container}>
      <Illustration />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Desafie a si mesmo</Text>
        <Text style={styles.slogan}>
          Comece uma dieta balanceada e saudável
        </Text>
      </View>
      <Pressable onPress={login} style={styles.signInButton}>
        <SignInIcon />
        <Text style={styles.signInButtonText}>Login with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: "10%",
    paddingHorizontal: "15%",
  },
  titleContainer: {
    width: "100%",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#343A40",
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
  slogan: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "#68717A",
    textAlign: "center",
  },
  signInButton: {
    flexDirection: "row",
    backgroundColor: "#FFE69C",
    borderRadius: 6,
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  signInButtonText: {
    color: "#343A40",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
