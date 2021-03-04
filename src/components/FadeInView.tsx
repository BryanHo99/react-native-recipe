import React, { ReactNode, useRef } from "react";
import Animated, { Easing, timing, Value } from "react-native-reanimated";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

interface FadeInViewProps {
  children: ReactNode;
}

const useFadeIn = (isFocused: boolean) => {
  const opacityRef = useRef<Value<number>>(new Value(0));

  useFocusEffect(() => {
    timing(opacityRef.current, {
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    }).start();
  });

  if (!isFocused) {
    opacityRef.current = new Value(0);
  }

  return opacityRef.current;
};

const FadeInView = ({ children }: FadeInViewProps) => {
  const isFocused = useIsFocused();
  const opacity = useFadeIn(isFocused);

  return <Animated.View style={{ flex: 1, opacity }}>{children}</Animated.View>;
};

export default FadeInView;
