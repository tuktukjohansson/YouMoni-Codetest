import * as Location from "expo-location";

export const fetchWeather = async (isHistorical: boolean) => {
  // Add the api key here. :)
  const API_KEY = "";
  const BASE_URL = "https://api.weatherapi.com/v1";

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      throw new Error("Location permission denied");
    }

    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;

    let url;
    if (isHistorical) {
      url = `${BASE_URL}/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=5`;
    } else {
      url = `${BASE_URL}/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error: ${response.status} - ${
          errorDetails.error?.message || "Unknown error"
        }`
      );
    }

    const weatherData = await response.json();

    return { weatherData };
  } catch (error) {
    console.error(
      "Error in fetchWeather:",
      error instanceof Error ? error.message : error
    );
    throw error;
  }
};
