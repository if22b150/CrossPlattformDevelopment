import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {
    ellipse,
    home,
    homeOutline,
    information,
    informationCircle,
    map,
    person,
    square,
    triangle
} from 'ionicons/icons';
import HomePage from './pages/home/home-page';
import MapPage from './pages/map/map-page';
import ProfilePage from './pages/profile/profile-page';
import AboutPage from "./pages/about/about-page";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import React, {useEffect} from "react";
import LoggerService from "./services/LoggerService";
import AstronautProvider from "./provider/AstronautProvider";

setupIonicReact();

const App: React.FC = () => {
    useEffect(() => {
        LoggerService.info('App mounted');
    }, []);

    return (
        <AstronautProvider initialValue={[]}>
            <IonApp>
                <IonReactRouter>
                    <IonTabs>

                        <IonRouterOutlet>
                            <Route exact path="/home" component={HomePage}/>
                            <Route exact path="/map" component={MapPage}/>
                            <Route exact path="/profile" component={ProfilePage}/>
                            <Route exact path="/about" component={AboutPage}/>
                            <Redirect exact from="/" to="/home"/>
                        </IonRouterOutlet>

                        <IonTabBar slot="bottom" id="tab-bar">
                            <IonTabButton tab="home" href="/home">
                                <IonIcon aria-hidden="true" icon={home}/>
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="map" href="/map">
                                <IonIcon aria-hidden="true" icon={map}/>
                                <IonLabel>Map</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="profile" href="/profile">
                                <IonIcon aria-hidden="true" icon={person}/>
                                <IonLabel>Profile</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="about" href="/about">
                                <IonIcon aria-hidden="true" icon={informationCircle}/>
                                <IonLabel>About</IonLabel>
                            </IonTabButton>
                        </IonTabBar>

                    </IonTabs>
                </IonReactRouter>
            </IonApp>
        </AstronautProvider>
    );
}

export default App;
