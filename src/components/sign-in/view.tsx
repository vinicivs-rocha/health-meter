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
      <View>
        <Text style={styles.title}>App title</Text>
        <Text style={styles.slogan}>App slogan</Text>
      </View>
      <Pressable onPress={login}>
        <SignInIcon />
        <Text>Login with Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  slogan: {
    fontSize: 16,
    color: "gray",
  },
});
