import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './map-page.css';

const MapPage: React.FC = () => {
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
