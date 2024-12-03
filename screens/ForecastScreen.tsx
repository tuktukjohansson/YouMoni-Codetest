import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { fetchWeather } from "../utils/weatherAPI";

import { forecastStyles } from "./styles";

type RootStackParamList = {
  CurrentTemp: undefined;
  Forecast: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "CurrentTemp">;

export default function ForecastScreen({ navigation }) {
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const { weatherData } = await fetchWeather(true);
        setForecast(weatherData);
      } catch (err) {
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
    <View style={forecastStyles.container}>
      {error ? (
        <Text style={forecastStyles.error}>Error: {error}</Text>
      ) : forecast ? (
        <View>
          {forecast.forecast["forecastday"].map((day, dayIndex) => (
            <View key={dayIndex}>
              <Text style={forecastStyles.dateText}>{day.date}</Text>
              <ScrollView horizontal style={forecastStyles.scrollView}>
                {day.hour.map((hour, hourIndex) => (
                  <View key={hourIndex} style={forecastStyles.hourContainer}>
                    <Text style={forecastStyles.tempText}>{hour.temp_c}°C</Text>
                    <Text style={forecastStyles.timeText}>{hour.time}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      ) : (
        <Text style={forecastStyles.text}>Loading weather...</Text>
      )}
    </View>
  );
}

interface Forecast {
  forecast: {
    temp_c: number;
    condition: {
      text: string;
    };
  };
  location: {
    name: string;
  };
}
