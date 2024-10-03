import {ReactElement, useContext, useEffect} from 'react';
import {IonItem, IonLabel, IonList, IonSpinner} from '@ionic/react';
import {AstronautModel} from "../../models/astronaut.model";
import {AstronautContext, AstronautContextType} from "../../provider/AstronautProvider";
import './AstronautList.css';

export const AstronautList = (): ReactElement => {
    const {astronauts, loading} = useContext(AstronautContext) as AstronautContextType;

    return (
        <>
            <IonList lines="full">
                {loading ? (
                    <div className={'spinnerWrapper'}>
                        <IonSpinner name="crescent" />
                    </div>
                ) : astronauts && astronauts.length > 0 ? (
                    astronauts.map((astronaut: AstronautModel, index: number) => (
                        <IonItem key={index}>
                            <IonLabel>{astronaut.name} - {astronaut.craft}</IonLabel>
                        </IonItem>
                    ))
                ) : (
                    <IonItem>
                        <IonLabel>No astronauts available</IonLabel>
                    </IonItem>
                )}
            </IonList>
        </>
    );
}
