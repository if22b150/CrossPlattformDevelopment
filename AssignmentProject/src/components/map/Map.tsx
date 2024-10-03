import {MapContainer, TileLayer, Marker, Popup, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {Icon, LatLngExpression} from "leaflet";
import {Geolocation} from '@capacitor/geolocation';
import React, {useEffect, useState} from "react";
import axios from "axios";
import LoggerService from "../../services/LoggerService";
import {IonButton, IonIcon} from "@ionic/react";
import {locate} from "ionicons/icons";

const ComponentResize = () => {
    const map = useMap();

    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    return null;
};

const SetViewOnPositionChange = ({position}: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position); // Pan the map to the new position
    }, [position, map]);

    return null;
};


const Map = () => {
    const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0]);
    const [issPosition, setIssPosition] = useState<[number, number]>([0, 0]);

    const fetchCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        setCurrentPosition([coordinates.coords.latitude, coordinates.coords.longitude]);
    };

    const fetchIssPosition = async () => {
        axios.get(
            "http://api.open-notify.org/iss-now.json"
        )
            .then((res) => {
                setIssPosition([res.data.iss_position.latitude, res.data.iss_position.longitude]);
            })
            .catch((error) => {
                console.error("Error fetching iss position:", error);
                LoggerService.error(error)
            })
    }

    const issMarkerIcon = new Icon({
        iconUrl: '../../../public/iss-icon.png', // Path to the ISS image
        iconSize: [50, 50], // Size of the icon
        iconAnchor: [25, 25], // Anchor the icon to the center of the marker
        popupAnchor: [0, -25], // Position the popup relative to the icon
    });

    useEffect(() => {
        fetchCurrentPosition()

        fetchIssPosition()
        const interval = setInterval(() => {
            fetchIssPosition(); // Update the ISS location every 5 seconds
        }, 5000);

        return () => clearInterval(interval); // Cleanup the interval on unmount
    }, []);

    return (
        <>
            <MapContainer
                style={{
                    height: "100%",
                    width: "100%",
                }}
                center={currentPosition}
                attributionControl={true}
                zoom={8}
                scrollWheelZoom={true}
            >
                <ComponentResize/>
                <SetViewOnPositionChange position={currentPosition}/>

                <TileLayer
                    // className={'ion-hide'}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={currentPosition}>
                    <Popup>
                        Device Location
                    </Popup>
                </Marker>

                <Marker position={issPosition} icon={issMarkerIcon}>
                    <Popup>
                        ISS Location
                    </Popup>
                </Marker>
            </MapContainer>
            <IonButton
                style={{
                    position: "fixed",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000
                }}
                onClick={fetchCurrentPosition}
            >
                <IonIcon slot="start" icon={locate}/>
                Device Position
            </IonButton>
        </>
    );
};

export default Map;