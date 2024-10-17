import React, { createContext, useState, useEffect } from 'react';
import { StationModel } from '@/app/models/station.model';
import * as SecureStore from 'expo-secure-store';
import Papa from 'papaparse';
import { Alert } from 'react-native';

const STORAGE_KEY = 'wiener_linen_stations';

// Context interface
interface StationsContextProps {
    stations: StationModel[];
    loading: boolean;
    fetchStationsData: () => void;
    addStation: (station: StationModel) => void;
    deleteAllStations: () => void;
}

// Create the context
export const StationsContext = createContext<StationsContextProps>({
    stations: [],
    loading: false,
    fetchStationsData: () => {},
    addStation: () => {},
    deleteAllStations: () => {},
});

type StationsProviderProps = {
    children: JSX.Element;
    initialValue: StationModel[] | undefined;
}

// Provider component
export const StationsProvider= (props: StationsProviderProps) => {
    const {children, initialValue} = props;
    const [stations, setStations] = useState<StationModel[]>(initialValue ?? []);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch stations from CSV and SecureStore
    const fetchStationsData = async () => {
        setLoading(true);
        try {
            // Get the old stations from SecureStore
            const storedData = await SecureStore.getItemAsync(STORAGE_KEY);
            let oldStations = storedData ? JSON.parse(storedData) : [];

            const csvUrl = 'https://data.wien.gv.at/csv/wienerlinien-ogd-haltestellen.csv'; // CSV URL
            const response = await fetch(csvUrl);
            const csvText = await response.text();

            // Parse the CSV
            const parsedData = Papa.parse(csvText, {
                header: true,
                skipEmptyLines: true,
            });

            // Map CSV data to Station model and limit to 100 stations
            const newStations: StationModel[] = parsedData.data.slice(0, 100).map((station: any) => ({
                id: station.HALTESTELLEN_ID,
                name: station.NAME,
                latitude: parseFloat(station.WGS84_LAT),
                longitude: parseFloat(station.WGS84_LON),
            }));

            // Merge old stations with new stations, avoiding duplicates
            const mergedStations = [...oldStations];

            newStations.forEach((newStation) => {
                const exists = mergedStations.some((oldStation) => oldStation.id === newStation.id);
                if (!exists) {
                    mergedStations.push(newStation);
                }
            });

            // Store and update state
            await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(mergedStations));
            setStations(mergedStations);
            Alert.alert('Success', 'Stations fetched and saved successfully!');
        } catch (error) {
            console.error('Error fetching stations:', error);
            Alert.alert('Error', 'Failed to fetch station data.');
        } finally {
            setLoading(false);
        }
    };

    // Add a new station
    const addStation = async (station: StationModel) => {
        const updatedStations = [...stations, station];
        setStations(updatedStations);
        await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(updatedStations));
        Alert.alert('Success', 'New station added successfully!');
    };

    // Delete all stations
    const deleteAllStations = async () => {
        try {
            await SecureStore.deleteItemAsync(STORAGE_KEY);
            setStations([]);
            Alert.alert('Success', 'All stations deleted successfully!');
        } catch (error) {
            console.error('Error deleting stations:', error);
            Alert.alert('Error', 'Failed to delete stations.');
        }
    };

    useEffect(() => {
        // Load stations when the provider is mounted
        (async () => {
            const storedData = await SecureStore.getItemAsync(STORAGE_KEY);
            if (storedData) {
                setStations(JSON.parse(storedData));
            }
        })();
    }, []);

    return (
        <StationsContext.Provider value={{ stations, loading, fetchStationsData, addStation, deleteAllStations }}>
            {children}
        </StationsContext.Provider>
    );
};
