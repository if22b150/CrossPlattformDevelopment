// HomeScreen.tsx
import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Title, Button, Card, Paragraph, Text, Portal, Dialog, TextInput, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StationModel } from '@/app/models/station.model';
import {StationsContext} from "@/app/provider/StationsProvidder";

export default function HomeScreen() {
    const { stations, loading, fetchStationsData, addStation, deleteAllStations } = useContext(StationsContext);
    const [visible, setVisible] = useState<boolean>(false);
    const [newStation, setNewStation] = useState<StationModel>({ id: '', name: '', latitude: 0, longitude: 0 });

    const handleAddStation = () => {
        addStation(newStation);
        setVisible(false);
    };

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Home" />
            </Appbar.Header>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.buttonContainer}>
                    <Button children={null} mode="contained" icon="cloud-download" onPress={fetchStationsData} style={styles.button} disabled={loading} />
                    <Button children={null} mode="contained" icon="delete" onPress={deleteAllStations} style={styles.button} disabled={loading} />
                    <Button children={null} mode="contained" icon="plus" onPress={() => setVisible(true)} style={styles.button} />
                </View>

                <Title style={styles.title}>Wiener Linien Stations</Title>
                {loading && <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />}
                {!loading && stations.length === 0 && (
                    <View style={styles.emptyMessageContainer}>
                        <Text style={styles.emptyMessage}>No stations available. Please fetch the data.</Text>
                    </View>
                )}
                {!loading && stations.length > 0 && (
                    <ScrollView>
                        {stations.map((station, index) => (
                            <Card key={index} style={styles.stationCard}>
                                <Card.Content>
                                    <Title>{station.name}</Title>
                                    <Paragraph>Latitude: {station.latitude}</Paragraph>
                                    <Paragraph>Longitude: {station.longitude}</Paragraph>
                                </Card.Content>
                            </Card>
                        ))}
                    </ScrollView>
                )}

                <Portal>
                    <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                        <Dialog.Title>Add New Station</Dialog.Title>
                        <Dialog.Content>
                            <TextInput label="Station Name" value={newStation.name} onChangeText={(text) => setNewStation({ ...newStation, name: text })} />
                            <TextInput label="Latitude" value={newStation.latitude.toString()} keyboardType="numeric" onChangeText={(text) => setNewStation({ ...newStation, latitude: parseFloat(text) })} />
                            <TextInput label="Longitude" value={newStation.longitude.toString()} keyboardType="numeric" onChangeText={(text) => setNewStation({ ...newStation, longitude: parseFloat(text) })} />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={handleAddStation}>Add</Button>
                            <Button onPress={() => setVisible(false)}>Cancel</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    stationCard: {
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    emptyMessageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    emptyMessage: {
        fontSize: 16,
        color: '#666',
    },
});
