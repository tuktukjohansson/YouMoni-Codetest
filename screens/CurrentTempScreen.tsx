import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { fetchWeather } from "../utils/weatherAPI";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { currentTempStyles } from "./styles";

type RootStackParamList = {
  CurrentTemp: undefined;
  Forecast: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "CurrentTemp">;

export default function CurrentTempScreen({ navigation }: Props) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const { weatherData } = await fetchWeather();
        setWeather(weatherData);
      } catch (err) {
        console.log("Caught error");
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    loadWeather();
  }, []);

  return (
    <View style={currentTempStyles.container}>
      {error ? (
        <Text style={currentTempStyles.error}>Error: {error}</Text>
      ) : weather ? (
        <View>
          <Text style={currentTempStyles.text}>
            Temp: {weather.current.temp_c}°C, {weather.current.condition.text}
          </Text>
          <Text style={currentTempStyles.text}>
            Your Location: {weather.location.name}
          </Text>
          <Button
            title="Go to Forecast"
            onPress={() => navigation.navigate("Forecast")}
          />
        </View>
      ) : (
        <Text style={currentTempStyles.text}>Loading weather...</Text>
      )}
    </View>
  );
}

interface Weather {
  current: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
  location: {
    name: string;
  };
}
