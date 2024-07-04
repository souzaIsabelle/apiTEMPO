import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import Card from '../components/Card';
import { Weather } from '../types/Home';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState<Weather[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchWeatherData = async (city: string) => {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1f9ada79c98b4a4ea20233012242606&q=${city}&lang=pt`);
            const data = await response.json();
            setWeatherData([data]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 2) {
            fetchWeatherData(searchQuery);
        } else {
            setWeatherData([]);
        }
    }, [searchQuery]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for a city"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={weatherData}
                keyExtractor={(item) => item.location.name}
                renderItem={({ item }) => (
                    <Card
                        weather={item}
                        onPress={() => navigation.navigate('Details', { weather: item })}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        margin: 10,
    },
});

export default HomeScreen;
