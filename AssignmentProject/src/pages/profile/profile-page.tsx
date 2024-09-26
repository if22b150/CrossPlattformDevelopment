import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './profile-page.css';
import {useEffect} from "react";
import LoggerService from "../../services/Logger";

const ProfilePage: React.FC = () => {
    useEffect(() => {
        LoggerService.info('Profile page mounted');
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/*Only for iOS*/}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

          {/*Content*/}


      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
