import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/Navigation';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
    route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<Props> = ({ route }) => {
    const { weather } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.city}>{weather.location.name}</Text>
            <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
            <Text style={styles.condition}>{weather.current.condition.text}</Text>
            <Image source={{ uri: `https:${weather.current.condition.icon}` }} style={styles.icon} />
            <View style={styles.detailsContainer}>
                <Text style={styles.details}>Vento: {weather.current.wind_kph} kph</Text>
                <Text style={styles.details}>Humidade: {weather.current.humidity}%</Text>
                <Text style={styles.details}>Sensação Térmica: {weather.current.feelslike_c}°C</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f8ff',
        alignItems: 'center',
    },
    city: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    temp: {
        fontSize: 28,
        color: '#ff4500',
        marginBottom: 5,
    },
    condition: {
        fontSize: 20,
        color: '#555',
        marginBottom: 20,
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    detailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    details: {
        fontSize: 18,
        color: '#333',
        marginVertical: 5,
    },
});

export default DetailScreen;
