import React, { useState, useEffect } from 'react';
import * as Haptics from 'expo-haptics';
import Spinner from 'react-native-loading-spinner-overlay';
import { BlurView } from 'expo-blur';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import Alerts from './alerts';
import Campsites from './campsites';
import axios from 'axios';

const App = ({ home, tree, bell, setSearched, setSearchFalse, iconClicked }) => {
  const [city, setCity] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (info) {
      setSearched();
    }
  }, [info]);


  const handleSubmit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLoading(true); // Set loading to true before starting the async operation
    try {
      const response = await axios.get(`http://10.0.0.108:3001/api/city-info?city=${city}`);
      setInfo(response.data);
      setError('');
    } catch (error) {
      setInfo(null);
      setError('Error: City not found or backend issue');
    }
    setLoading(false);
  };

  return (
    <View>
      <View style={{ margin: 'auto', }} >
        <TouchableOpacity onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCity(''); setInfo(null); setSearchFalse(); iconClicked('home')
        }}>
          <Image source={require('../../assets/logo-g.png')} style={{ width: 300, marginTop: 50 }} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {home ?
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              onChangeText={text => setCity(text)}
              value={city}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Spinner
              visible={loading}
              textContent={'Loading...'}
              textStyle={{ ...styles.spinnerTextStyle, color: 'white' }}
              color='black'
            />
          </>
          : null}
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {info ? (
          <>
            {home ? <Tips tips={info.chatGPT} /> : null}
            {home ? <Weather weather={info.weather} /> : null}
            {tree ? <Campsites campsites={info.campsites} /> : null}
            {bell ? <Alerts alerts={info.alerts} /> : null}
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  spinnerTextStyle: {
    color: 'white',
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
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: 5,
  },
  tipsText: {
    fontSize: 18,
  },
  weatherContainer: {
    marginTop: 20,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    borderRadius: 20,
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
});

const Tips = ({ tips }) => (
  <BlurView
    style={styles.tipsContainer}
    blurType="light"
    blurAmount={1}
    reducedTransparencyFallbackColor="white"
  >
    <Text style={styles.tipsText}>{tips}</Text>
  </BlurView>
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

export default App;
