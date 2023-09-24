import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import Separator from "./Separator";

const FlagItem = ({ code, name, dial_code, flag, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress({ code, name, dial_code })}
    >
      <View style={styles.subContainer}>
        <Text>{flag}</Text>
        <Separator width={10} />
        <Text style={styles.flagText}>{name}</Text>
      </View>
      <Text style={styles.flagText}>{dial_code}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: Display.setWidth(60),
  },
  flagText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginRight: 10,
  },
});

export default FlagItem;
