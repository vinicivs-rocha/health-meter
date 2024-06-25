import { Canvas, Path, usePathValue } from "@shopify/react-native-skia";
import { useEffect } from "react";
import {
  interpolate,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface WaveProgressProps {
  progress: number;
  width: number;
  height: number;
}

export default function WaveProgress({
  progress,
  width,
  height,
}: WaveProgressProps) {
  const pathHeight = useSharedValue(0);

  const wavesCoeficientStage = useSharedValue(0);

  const wavesCoeficient = interpolate(
    wavesCoeficientStage.value,
    [0, 1, 2],
    [5, -5, 0]
  );

  const path = usePathValue((path) => {
    "worklet";
    path.moveTo(0, pathHeight.value);
    path.cubicTo(
      10,
      pathHeight.value - wavesCoeficient,
      40,
      pathHeight.value - wavesCoeficient,
      50,
      pathHeight.value
    );
    path.cubicTo(
      60,
      pathHeight.value + wavesCoeficient,
      90,
      pathHeight.value + wavesCoeficient,
      100,
      pathHeight.value
    );
    path.lineTo(100, 100);
    path.lineTo(0, 100);
    path.close();
  });

  useEffect(() => {
    pathHeight.value = withTiming(progress, { duration: 30000 }, (finished) => {
      if (finished) {
        pathHeight.value = withTiming(2, { duration: 1000 });
      }
    });
    wavesCoeficientStage.value = withRepeat(
      withTiming(1, { duration: 500 }),
      -1,
      true
    );
  }, []);

  return (
    <Canvas
      style={[
        { width, height },
        {
          position: "absolute",
          bottom: -8,
          left: -8,
          backgroundColor: "#FDE0474D",
          zIndex: -1,
        },
      ]}
    >
      <Path path={path} color={"#FDE047"} />
    </Canvas>
  );
}
