import { Weather } from "./Home";


export type RootStackParamList = {
    Home: undefined;
    Details: { weather: Weather};
};
