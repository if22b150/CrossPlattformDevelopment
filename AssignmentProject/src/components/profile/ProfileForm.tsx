import React, { useState, useEffect } from 'react';
import { IonButton, IonInput, IonItem, IonLabel, IonToast } from '@ionic/react';

const ProfileForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [profilePicture, setProfilePicture] = useState<string>('');
    const [showToast, setShowToast] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Load profile data from localStorage when component mounts
    useEffect(() => {
        const savedName = localStorage.getItem('name');
        const savedAddress = localStorage.getItem('address');
        const savedEmail = localStorage.getItem('email');
        const savedProfilePicture = localStorage.getItem('profilePicture');

        if (savedName) setName(savedName);
        if (savedAddress) setAddress(savedAddress);
        if (savedEmail) setEmail(savedEmail);
        if (savedProfilePicture) setProfilePicture(savedProfilePicture);
    }, []);

    const handleSave = () => {
        // Simple validation (ensure email is present and valid)
        if (!email.includes('@')) {
            setErrorMessage('Invalid email address');
            return;
        }

        // Save profile data to localStorage
        localStorage.setItem('name', name);
        localStorage.setItem('address', address);
        localStorage.setItem('email', email);
        localStorage.setItem('profilePicture', profilePicture);

        // Display success notification
        setShowToast(true);
        setErrorMessage(null);
    };

    return (
        <form>
            <IonItem>
                <IonInput labelPlacement="floating" value={name} onIonInput={(e: any) => setName(e.detail.value!)}>
                    <div slot="label">Name</div>
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput labelPlacement="floating" value={address} onIonInput={(e: any) => setAddress(e.detail.value!)}>
                    <div slot="label">Address</div>
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput labelPlacement="floating" value={email} onIonInput={(e: any) => setEmail(e.detail.value!)}>
                    <div slot="label">E-Mail</div>
                </IonInput>
            </IonItem>

            <IonItem>
                <IonInput labelPlacement="floating" value={profilePicture} onIonInput={(e: any) => setProfilePicture(e.detail.value!)}>
                    <div slot="label">Profile Picture URL</div>
                </IonInput>
            </IonItem>

            <IonButton style={{marginTop: '2rem'}} expand="block" onClick={handleSave}>Save Profile</IonButton>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Profile successfully saved"
                duration={2000}
                swipeGesture="vertical"
                positionAnchor="tab-bar"
            />
        </form>
    );
};

export default ProfileForm;
