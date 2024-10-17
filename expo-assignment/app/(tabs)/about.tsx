import React from 'react';
import { View, Image, Linking, ScrollView, StyleSheet } from 'react-native';
import {Text, Title, Appbar, IconButton, Divider, Button} from 'react-native-paper';
import {DeveloperModel} from "@/app/models/developer.model";
import PackageJson from '../../package.json';

export default function About() {
    const developer: DeveloperModel = {
        firstName: "Max",
        lastName: "Mustermann",
        email: "max@mustermann.com",
        website: "https://www.mustermann.com",
    };

    const openEmail = () => {
        Linking.openURL(`mailto:${developer.email}`);
    };

    const openWebsite = () => {
        Linking.openURL(developer.website);
    };

    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="About" />
            </Appbar.Header>

            {/* Developer Details */}
            <View style={styles.developerDetails}>
                <Image
                    style={styles.profilePicture}
                    source={require('../../assets/images/developer.png')} // Replace with actual DevImage path
                    resizeMode="contain"
                />

                <Title>{developer.firstName} {developer.lastName}</Title>

                <View style={styles.iconDetail}>
                    <IconButton icon="email" size={30} onPress={openEmail} />
                    <Button onPress={openEmail}>{developer.email}</Button>
                </View>

                <View style={styles.iconDetail}>
                    <IconButton icon="web" size={30} onPress={openWebsite} />
                    <Button onPress={openWebsite}>{developer.website}</Button>
                </View>
            </View>

            <Divider style={styles.divider} />

            {/* Version and Logs */}
            <View style={styles.versionContent}>
                <Text>
                    <Text style={styles.boldText}>Package Version: </Text>{PackageJson.version}
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    developerDetails: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        paddingTop: 50
    },
    profilePicture: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
    },
    iconDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    divider: {
        marginVertical: 20,
        height: 1,
    },
    versionContent: {
        alignItems: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    },
});
