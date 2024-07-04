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
            <Text style={styles.details}>Vento: {weather.current.wind_kph} kph</Text>
            <Text style={styles.details}>Humidade: {weather.current.humidity}%</Text>
            <Text style={styles.details}>Sensação Térmica: {weather.current.feelslike_c}°C</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    city: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 22,
    },
    condition: {
        fontSize: 18,
        color: '#555',
    },
    icon: {
        width: 50,
        height: 50,
    },
    details: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default DetailScreen;
