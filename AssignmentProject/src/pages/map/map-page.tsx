import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './map-page.css';
import {useEffect} from "react";
import LoggerService from "../../services/Logger";

const MapPage: React.FC = () => {
    useEffect(() => {
        LoggerService.info('Map page mounted');
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          {/*Only for iOS*/}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Map</IonTitle>
          </IonToolbar>
        </IonHeader>



      </IonContent>
    </IonPage>
  );
};

export default MapPage;
