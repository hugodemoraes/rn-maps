import { StyleSheet, Text, View } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    flexGrow: 1,
  },
  marker: {
    width: 44,
    height: 44,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  destination: {
    width: 44,
    height: 44,
    backgroundColor: "#F88070",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    zIndex: 1,
    width: "90%",
    top: 55,
  },
  searchInput: {
    height: 55,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#E3E3E3",
  },
});
