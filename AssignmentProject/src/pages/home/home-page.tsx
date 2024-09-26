import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './home-page.css';
import React, {useEffect} from "react";
import LoggerService from "../../services/Logger";

const HomePage: React.FC = () => {
    useEffect(() => {
        LoggerService.info('Home page mounted');
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/*Only for iOS*/}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
