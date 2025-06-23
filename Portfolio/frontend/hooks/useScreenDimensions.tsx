import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export default function useScreenDimensions() {
  const [screenData, setScreenData] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setScreenData(window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription.remove();
  }, []);

  return {
    width: screenData.width,
    height: screenData.height,
    isLandscape: screenData.width > screenData.height,
  };
}
