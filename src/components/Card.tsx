import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Weather } from '../types/Home';

interface CardProps {
    weather: Weather;
    onPress: () => void;
}

const Card: React.FC<CardProps> = ({ weather, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.city}>{weather.location.name}</Text>
            <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
            <Text style={styles.condition}>{weather.current.condition.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    city: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 16,
    },
    condition: {
        fontSize: 14,
        color: '#555',
    },
});

export default Card;
