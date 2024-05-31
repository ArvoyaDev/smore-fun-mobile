import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabs from './(tabs)';

export default function Layout() {
  let [activeIcon, setActiveIcon] = useState('home');
  let [searched, searchedActive] = useState(false);

  const iconClicked = (icon: string) => {
    setActiveIcon(icon);
  }

  const setSearch = () => {
    searchedActive(true);
  }

  const setSearchFalse = () => {
    searchedActive(false);
  }

  return (
    <ImageBackground source={require('../assets/background.png')} style={styles.background} >
      <View style={styles.container}>
        <Tabs home={activeIcon === 'home'} tree={activeIcon === 'tree'} bell={activeIcon === 'bell'} setSearched={setSearch} setSearchFalse={setSearchFalse} iconClicked={iconClicked} />
      </View>
      {searched ?
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); iconClicked('home') }}>
            <Icon style={styles.icon} name="home" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); iconClicked('tree') }}>
            <Icon style={styles.icon} name="tree" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); iconClicked('bell') }}>
            <Icon style={styles.icon} name="warning" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        : null
      }
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  iconContainer: {
    flex: .1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
  }
});
