import {
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './about-page.css';
import React, {useEffect} from "react";
import DevImage from '../../assets/images/developer.svg';
import {DeveloperModel} from "../../models/developer.model";
import {globeOutline, mailOutline} from "ionicons/icons";
import LogsModal from "../../components/logs/logs-modal";

import PackageJson from '../../../package.json';
import LoggerService from "../../services/LoggerService";

const AboutPage: React.FC = () => {
    useEffect(() => {
        LoggerService.info('About page mounted');
    }, []);

    const developer: DeveloperModel = {
        firstName: "Max",
        lastName: "Mustermann",
        email: "max@mustermann.com",
        website: "https://www.mustermann.com",
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                {/*Only for iOS*/}
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">About</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <div className="content h-100">

                    {/*DEVELOPER*/}
                    <div className="developer-details flex flex-column align-items-center justify-content-center">
                        <div className="profile-picture">
                            <img alt="Developer picture" width="75" height="75" src={DevImage}/>
                        </div>

                        <div className="developer-name">{developer.firstName} {developer.lastName}</div>

                        <div className="flex flex-column align-items-center developer-icon-detail">
                            <IonIcon size="large" icon={mailOutline}></IonIcon>
                            <a href={'mailto:' + developer.email}>{developer.email}</a>
                        </div>

                        <div className="flex flex-column align-items-center developer-icon-detail">
                            <IonIcon size="large" icon={globeOutline}></IonIcon>
                            <a href={developer.website} target="_blank">{developer.website}</a>
                        </div>

                    </div>

                    <hr className="divider" />

                    {/*VERSION AND LOGS*/}
                    <div className="version-content flex flex-column align-items-center">
                        <p><strong>Package Version:</strong>&nbsp;{PackageJson.version}</p>

                        <LogsModal />
                    </div>

                </div>

            </IonContent>
        </IonPage>
    );
};

export default AboutPage;
