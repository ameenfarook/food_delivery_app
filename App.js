import React from "react";
import Navigators from "./src/navigators";
import { Store } from "./src/Store";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import { CustomFonts } from "./src/constants";

export default () => {
  const [fontsLoaded] = useFonts(CustomFonts);
  return fontsLoaded ? (
    <Provider store={Store}>
      <Navigators />
    </Provider>
  ) : null;
};
