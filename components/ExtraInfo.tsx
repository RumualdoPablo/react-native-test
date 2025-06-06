import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ExtraInfo = ({ info }: { info: Record<string, any> }) => {
  return (
    <View style={styles.detailsContainer}>
      {Object.entries(info).map(([key, value]) => (
        <Text key={key} style={styles.species}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
          {typeof value === "object" && value !== null && "name" in value
            ? value.name
            : String(value)}
        </Text>
      ))}
    </View>
  );
};

export default ExtraInfo;

const styles = StyleSheet.create({
  detailsContainer: {
    alignItems: "center",
  },
  species: {
    fontSize: 18,
    color: "#b5bac8",
    textAlign: "center",
    marginBottom: 24,
  },
});
