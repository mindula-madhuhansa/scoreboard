import { useLottie } from "lottie-react";
import redDot from "./redDot.json";

export default function RedDot() {
  const style = {
    height: 36,
  };

  const options = {
    animationData: redDot,
    loop: true,
  };

  const { View } = useLottie(options, style);

  return View;
}
