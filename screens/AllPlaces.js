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

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
