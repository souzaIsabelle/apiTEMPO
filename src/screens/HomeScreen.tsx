import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (city: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=32f451224ad247d58cf232213240708&q=${city}&lang=pt`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error.message);
            }
            setWeatherData([data]);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
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
            {loading && <Text style={styles.loadingText}>Loading...</Text>}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {!loading && !error && (
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
            )}
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
    loadingText: {
        textAlign: 'center',
        margin: 20,
    },
    errorText: {
        textAlign: 'center',
        margin: 20,
        color: 'red',
    },
});

export default HomeScreen;
