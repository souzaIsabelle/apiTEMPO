export interface Weather {
    location: {
        name: string;
        region: string;
        country: string;
    };
    current: {
        temp_c: number;
        condition: {
            text: string;
            icon: string;
        };
        wind_kph: number;
        humidity: number;
        feelslike_c: number;
    };
}