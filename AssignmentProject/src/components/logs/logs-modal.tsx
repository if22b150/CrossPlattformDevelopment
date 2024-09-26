import React, {useEffect, useRef, useState} from "react";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonItem, IonLabel, IonList,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import LoggerService from "../../services/Logger";

function LogsModal() {
    const modal = useRef<HTMLIonModalElement>(null);
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        LoggerService.info('Log modal mounted')
        // Get logs when the modal opens
        setLogs(LoggerService.getLogs());
    }, []);

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
                        {/*TODO: LIST OF ACTUAL LOGS*/}
                        {logs.map((log, i) => {
                            return (
                                <IonItem key={i}>
                                    <IonLabel>{log}</IonLabel>
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