import { StyleSheet } from "react-native";

const currentTempStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    padding: 2,
    fontSize: 20,
  },
  error: {
    color: "red",
  },
});

const forecastStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  scrollView: {
    marginBottom: 50,
  },
  hourContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  tempText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
    color: "gray",
  },
  error: {
    color: "red",
  },
  text: {
    fontSize: 14,
  },
  dateText: {
    padding: 10,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
});

export { currentTempStyles, forecastStyles };
