import {
    IonButton,
    IonContent,
    IonHeader, IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './home-page.css';
import React, {useContext, useEffect} from "react";
import {AstronautList} from "../../components/astronauts/AstronautList";
import {AstronautContext, AstronautContextType} from "../../provider/AstronautProvider";
import LoggerService from "../../services/LoggerService";
import {reload} from "ionicons/icons";

const HomePage: React.FC = () => {
    const {astronauts, fetchAstronauts, loading} = useContext(AstronautContext) as AstronautContextType;


    useEffect(() => {
        LoggerService.info('Home page mounted');
        fetchAstronauts()
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">

                <h4>Astronauts</h4>
                <AstronautList/>
                {!loading && (
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
                        <IonButton shape="round" onClick={fetchAstronauts}>
                            <IonIcon slot="icon-only" icon={reload}></IonIcon>
                        </IonButton>
                    </div>
                )}
            </IonContent>
        </IonPage>
    );
};

export default HomePage;
