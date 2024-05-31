import { View, Text, StyleSheet, Linking, Image } from 'react-native';
import Swiper from 'react-native-swiper';

const Campsites = ({ campsites }) => (
  <View style={styles.campsitesContainer}>
    {campsites.map((campsite, index) => (
      <View key={index} style={styles.campsiteItem}>
        <Text style={styles.campsiteTitle}>{campsite.title}</Text>
        <Swiper
          height={200}
          dotColor="grey" // color of non-active dots
          activeDotColor="orange" // color of active dot
          paginationStyle={{ bottom: 10 }} // position of pagination dots
        >
          {campsite.images && campsite.images.map((image, imageIndex) => (
            <Image key={imageIndex} source={{ uri: image.url }} style={styles.campsiteImage} />
          ))}
        </Swiper>
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

export default Campsites;

const styles = StyleSheet.create({

  campsitesContainer: {
    marginTop: 20,
    width: '100%',
  },
  campsiteImage: {
    width: '100%', // or any other size you want
    height: 200, // or any other size you want
    resizeMode: 'cover', // or 'contain' if you want the whole image to be visible
  },
  campsiteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
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
