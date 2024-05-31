
import { View, Text, StyleSheet, Linking } from 'react-native';

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

export default Alerts;

const styles = StyleSheet.create({

  alertsContainer: {
    marginTop: 20,
    width: '100%',
  },
  alertItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
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
});
