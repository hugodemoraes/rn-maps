import { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

import { styles } from "./styles";

type CoordProps = {
  latitude: number;
  longitude: number;
};

export default function App() {
  const [currentLocation, setCurrentLocation] = useState<CoordProps | null>(
    null
  );
  const [destination, setDestination] = useState<CoordProps | null>(null);
  const [coords, setCoords] = useState<CoordProps[]>([]);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription;

    Location.requestForegroundPermissionsAsync().then(({ status }) => {
      if (status !== Location.PermissionStatus.GRANTED)
        return Alert.alert("É necessário habilitar a permissão de localização");

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setCurrentLocation(location.coords);
          setCoords((prevState) => [...prevState, location.coords]);
        }
      ).then((response) => (subscription = response));
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        styles={{
          container: styles.searchContainer,
          textInput: styles.searchInput,
        }}
        placeholder="Qual o destino?"
        GooglePlacesDetailsQuery={{ fields: "geometry" }}
        enablePoweredByContainer={false}
        fetchDetails
        query={{
          key: "AIzaSyBdvXakXzo5ADP6fdTJvB-XJTqgtmo0nt4",
          language: "pt-BR",
        }}
        // onFail={console.log}
        onPress={(data, details) =>
          setDestination({
            latitude: details?.geometry.location.lat ?? 0,
            longitude: details?.geometry.location.lng ?? 0,
          })
        }
      />
      {currentLocation && (
        <MapView
          style={styles.map}
          provider="google"
          ref={mapRef}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker identifier="origin" coordinate={currentLocation}>
            <View style={styles.marker}>
              <FontAwesome name="map" size={24} color="white" />
            </View>
          </Marker>
          {destination && (
            <Marker identifier="destination" coordinate={destination}>
              <View style={styles.destination}>
                <FontAwesome name="map-marker" size={24} color="white" />
              </View>
            </Marker>
          )}

          <Polyline coordinates={coords} strokeColor="black" strokeWidth={6} />

          {destination && (
            <MapViewDirections
              origin={currentLocation}
              destination={destination}
              apikey="AIzaSyBdvXakXzo5ADP6fdTJvB-XJTqgtmo0nt4"
              strokeColor="black"
              strokeWidth={6}
              lineDashPattern={[0]}
              onReady={(result) =>
                mapRef.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    top: 130,
                    right: 30,
                    left: 30,
                    bottom: 30,
                  },
                })
              }
            />
          )}
        </MapView>
      )}
    </View>
  );
}
