import React, {useRef} from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonInput,
    IonItem, IonLabel, IonList,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react";

function LogsModal() {
    const modal = useRef<HTMLIonModalElement>(null);
    const logEntries: { message: string }[] = [
        {message: "Log 1"},
        {message: "Log 2"},
        {message: "Log 3"},
        {message: "Log 4"},
    ]

    // function confirm() {
    //     modal.current?.dismiss();
    // }

    return (
        <>
            <IonButton id="open-modal" expand="block">
                Show Logs
            </IonButton>

            <IonModal ref={modal} trigger="open-modal">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>Logs</IonTitle>
                        {/*<IonButtons slot="end">*/}
                        {/*    <IonButton strong={true} onClick={() => confirm()}>*/}
                        {/*        Confirm*/}
                        {/*    </IonButton>*/}
                        {/*</IonButtons>*/}
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonList>
                        {logEntries.map((logEntry, i) => {
                            return (
                                <IonItem>
                                    <IonLabel>{logEntry.message}</IonLabel>
                                </IonItem>
                            )
                        })}
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}

export default LogsModal;