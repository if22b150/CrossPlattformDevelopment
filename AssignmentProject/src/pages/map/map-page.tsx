import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './map-page.css';
import React from "react";
import Map from "../../components/map/Map";

const MapPage: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Map</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>

                <Map></Map>

            </IonContent>
        </IonPage>
    );
};

export default MapPage;
