// MapPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Appbar } from 'react-native-paper';
import * as Location from 'expo-location';
import { LocationObjectCoords } from 'expo-location';
import {StationsContext} from "@/app/provider/StationsProvidder";

export default function MapPage() {
    const [location, setLocation] = useState<LocationObjectCoords | null>(null); // Store the user's location
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Access stations from StationsContext
    const { stations } = useContext(StationsContext);

    useEffect(() => {
        (async () => {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // Get the user's current location
            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation(userLocation.coords); // Store the user's coordinates
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Map" />
            </Appbar.Header>

            {/* Render the map */}
            <MapView
                style={styles.map}
                showsUserLocation={true}
                initialRegion={{
                    latitude: location ? location.latitude : 37.78825,
                    longitude: location ? location.longitude : -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Marker for the user's location */}
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title="You are here"
                    />
                )}

                {/* Display markers for all stored stations */}
                {stations.map((station, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: station.latitude,
                            longitude: station.longitude,
                        }}
                        title={station.name}
                        description={`Station ID: ${station.id}`}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
