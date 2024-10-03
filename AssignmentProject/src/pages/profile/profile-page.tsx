import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './profile-page.css';
import {useEffect} from "react";
import LoggerService from "../../services/LoggerService";
import ProfileForm from "../../components/profile/ProfileForm";

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
      <IonContent fullscreen className="ion-padding">
        <ProfileForm />
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
