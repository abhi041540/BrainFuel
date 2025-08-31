import React from "react";
import { StyleSheet, View } from "react-native";

type ProgressBarProps = {
  value: number;   
  max: number;     
};

const ProgressBar = ({ value, max }: ProgressBarProps) => {
  const progressPercent = Math.min((value / max) * 100, 100);

  return (
    <View style={{alignItems:"center",justifyContent:"center"}}>
        <View style={styles.container}>
      <View style={[styles.fill, { width: `${progressPercent}%` }]} />
    </View>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 12,
    width: "94%",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#5c3411ff",
    margin:10,
    marginBottom:20
  },
  fill: {
    height: "100%",
    backgroundColor: "#d84c10ff"
  }
});
