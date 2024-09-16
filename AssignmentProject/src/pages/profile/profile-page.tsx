import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './profile-page.css';

const ProfilePage: React.FC = () => {
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
