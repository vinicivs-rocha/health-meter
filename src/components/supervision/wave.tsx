import { Canvas, FitBox, Path, rect, Skia } from "@shopify/react-native-skia";
import { useEffect } from "react";
import {
  interpolate,
  useDerivedValue,
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
  const xStage = useSharedValue(0);

  const path = useDerivedValue(() => {
    const wavesCoeficient = interpolate(
      wavesCoeficientStage.value,
      [0, 1, 2],
      [progress / 10, 0, -progress / 10]
    );

    const xValue = interpolate(xStage.value, [0, 1, 2], [15, 0, -15]);

    const path = Skia.Path.Make();
    path.moveTo(-15 + xValue, 100 - pathHeight.value);
    path.cubicTo(
      -5 + xValue,
      100 - (pathHeight.value - wavesCoeficient),
      35 + xValue,
      100 - (pathHeight.value - wavesCoeficient),
      45 + xValue,
      100 - pathHeight.value
    );
    path.cubicTo(
      75 + xValue,
      100 - (pathHeight.value + wavesCoeficient),
      105 + xValue,
      100 - (pathHeight.value + wavesCoeficient),
      115 + xValue,
      100 - pathHeight.value
    );
    path.lineTo(115 - xValue, 100);
    path.lineTo(-15 + xValue, 100);
    path.close();
    return path;
  }, [pathHeight, wavesCoeficientStage, xStage]);

  useEffect(() => {
    pathHeight.value = withTiming(progress, { duration: 2000 }, (finished) => {
      if (finished) {
        wavesCoeficientStage.value = withRepeat(
          withTiming(2, { duration: 1000 }),
          -1,
          true
        );
        xStage.value = withRepeat(withTiming(2, { duration: 1000 }), -1, true);
      }
    });

    wavesCoeficientStage.value = withRepeat(
      withTiming(2, { duration: 500 }),
      -1,
      true
    );

    xStage.value = withRepeat(withTiming(2, { duration: 500 }), -1, true);
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
      {progress > 0 && (
        <FitBox
          src={rect(0, 0, 100, 100)}
          dst={rect(0, 0, width, height)}
          fit="fill"
        >
          <Path path={path} color={"#FDE047"} />
        </FitBox>
      )}
    </Canvas>
  );
}
