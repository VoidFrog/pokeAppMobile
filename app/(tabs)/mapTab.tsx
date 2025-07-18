import {
  AppleMaps,
  CameraPosition,
  Coordinates,
  GoogleMaps,
  useLocationPermissions,
} from "expo-maps";
import { GoogleMapsMarker } from "expo-maps/build/google/GoogleMaps.types";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const MapTab = () => {
  const [permissionStatus, requestPermission] = useLocationPermissions();
  const [currentMarkers, setCurrentMarkers] = useState<GoogleMapsMarker[]>([]);

  const coords: Coordinates = {
    latitude: 50.07,
    longitude: 19.94,
  };

  const initialCameraPosition: CameraPosition = {
    coordinates: coords,
    zoom: 12,
  };

  useEffect(() => {
    if (!permissionStatus?.granted) requestPermission();
    const perm = async () => {
      const status = await requestPermission();
      console.log({ status });
    };
    perm();
  }, [permissionStatus]);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <AppleMaps.View style={StyleSheet.absoluteFill} />
      ) : Platform.OS === "android" ? (
        <GoogleMaps.View
          style={StyleSheet.absoluteFill}
          cameraPosition={initialCameraPosition}
          onMapLongClick={(ev) => {
            console.log(ev, "outside the fn");
            //argument given by the onMapLongClick is not of type ev: {coordinates: Coordinates}
            //it's actually just Coordinates for some reason?? it's bugged
            handleLongClick(ev, currentMarkers, setCurrentMarkers);
          }}
          markers={currentMarkers}
        />
      ) : (
        <Text>Maps are only supported on Android and IOS, sorry!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const handleLongClick = (
  event: Coordinates,
  currentMarkers: GoogleMapsMarker[],
  setCurrentMarkers: Function
) => {
  const marker: GoogleMapsMarker = {
    title: `Marker :3`,
    coordinates: event,
    showCallout: true,
    snippet: `coords: {${event.latitude}, ${event.longitude}}`,
  };

  setCurrentMarkers([...currentMarkers, marker]);
};

export default MapTab;
