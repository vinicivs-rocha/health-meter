import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface BoneProps {
  style?: StyleProp<ViewStyle>;
}

const { width } = Dimensions.get("window");

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Bone({ style }: BoneProps) {
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(x, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.ease),
      })
    ).start();
  }, []);

  return (
    <View
      style={[
        style,
        { borderRadius: 8, backgroundColor: "#908F8F", overflow: "hidden" },
      ]}
    >
      <View style={[{ flex: 1 }]}>
        <AnimatedLinearGradient
          colors={["#908F8F", "#CECECE", "#908F8F"]}
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [
                {
                  translateX: x.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width],
                  }),
                },
              ],
            },
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
}
