import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import Button from "../UI/Button";
import { deletePlace } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      // setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
    }
  }, [isFocused]);

  function deleteFunction() {
    deletePlace("Thu Dec 26 2024 23:50:52 GMT+04000.8272565178338113");
    console.log("Hello");
  }

  return (
    <>
      <PlacesList places={loadedPlaces} />
      <View>
        <Button style={styles.button} onPress={deleteFunction} />
      </View>
    </>
  );
}

export default AllPlaces;

const styles = StyleSheet.create({
  button: {
    color: "white",
  },
});
