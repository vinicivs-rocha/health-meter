import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface IndexViewProps {
  illustration: string;
  googleIcon: string;
  login: () => Promise<void>;
}

export default function IndexView({
  illustration,
  login,
  googleIcon,
}: IndexViewProps) {
  return (
    <View style={styles.container}>
      <Image source={require(illustration)} />
      <View>
        <Text style={styles.title}>App title</Text>
        <Text style={styles.slogan}>App slogan</Text>
      </View>
      <Pressable onPress={login}>
        <Text>Login with Google</Text>
        <Image src={require(googleIcon)} />
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
