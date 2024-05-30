import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { ImageBackground } from 'react-native';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/city-info?city=${city}`);
      setInfo(response.data);
      setError('');
    } catch (error) {
      setInfo(null);
      setError('Error: City not found or backend issue');
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background} >
      <View style={{ margin: 'auto', }} >
        <Image source={require('../../assets/logo.png')} style={{ width: 300, marginTop: 50 }} resizeMode="contain" />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          onChangeText={text => setCity(text)}
          value={city}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {info ? (
          <>
            <Tips tips={info.chatGPT} />
            <Weather weather={info.weather} />
            <Alerts alerts={info.alerts} />
            <Campsites campsites={info.campsites} />
          </>
        ) : null}
      </ScrollView>
    </ImageBackground >
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  tipsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  tipsText: {
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 20,
    width: '100%',
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.31)',
  },
  weatherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  weatherDate: {
    flex: 1,
    fontSize: 16,
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  weatherDescription: {
    flex: 2,
    fontSize: 16,
  },
  weatherTemp: {
    flex: 1,
    fontSize: 16,
    textAlign: 'right',
  },
  alertsContainer: {
    marginTop: 20,
    width: '100%',
  },
  alertItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertCategory: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  alertDescription: {
    fontSize: 14,
  },
  alertLink: {
    color: 'blue',
    marginTop: 5,
  },
  campsitesContainer: {
    marginTop: 20,
    width: '100%',
  },
  campsiteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  campsiteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  campsiteDescription: {
    fontSize: 14,
  },
  campsiteWeather: {
    fontSize: 14,
  },
  campsiteDistance: {
    fontSize: 14,
  },
  campsiteDuration: {
    fontSize: 14,
  },
  campsiteLink: {
    color: 'blue',
    marginTop: 5,
  },
});

const Tips = ({ tips }) => (
  <View style={styles.tipsContainer}>
    <Text style={styles.tipsText}>{tips}</Text>
  </View>
);

const Weather = ({ weather }) => (
  <BlurView
    style={styles.weatherContainer}
    blurType="light"
    blurAmount={5}
    reducedTransparencyFallbackColor="white"
  >
    {weather.map((day, index) => (
      <View key={index} style={styles.weatherItem}>
        <Text style={styles.weatherDate}>{day.date}</Text>
        <Image source={{ uri: day.img }} style={styles.weatherIcon} />
        <Text style={styles.weatherDescription}>{day.description}</Text>
        <Text style={styles.weatherTemp}>{day.temp}°C</Text>
      </View>
    ))}
  </BlurView>
);

const Alerts = ({ alerts }) => (
  <View style={styles.alertsContainer}>
    {alerts.map((alert, index) => (
      <View key={index} style={styles.alertItem}>
        <Text style={styles.alertTitle}>{alert.title}</Text>
        <Text style={styles.alertCategory}>{alert.category}</Text>
        <Text style={styles.alertDescription}>{alert.description}</Text>
        {alert.url ? (
          <Text style={styles.alertLink} onPress={() => Linking.openURL(alert.url)}>More Info</Text>
        ) : null}
      </View>
    ))}
  </View>
);

const Campsites = ({ campsites }) => (
  <View style={styles.campsitesContainer}>
    {campsites.map((campsite, index) => (
      <View key={index} style={styles.campsiteItem}>
        <Text style={styles.campsiteTitle}>{campsite.title}</Text>
        <Text style={styles.campsiteDescription}>{campsite.description}</Text>
        <Text style={styles.campsiteWeather}>Weather: {campsite.weather}</Text>
        <Text style={styles.campsiteDistance}>Distance: {campsite.distance} miles</Text>
        <Text style={styles.campsiteDuration}>Duration: {campsite.duration}</Text>
        {campsite.reservationUrl ? (
          <Text style={styles.campsiteLink} onPress={() => Linking.openURL(campsite.reservationUrl)}>Reservation Info</Text>
        ) : null}
      </View>
    ))}
  </View>
);

export default App;
