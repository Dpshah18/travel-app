import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, PermissionsAndroid, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const allPlaces = [
  { id: '1', name: 'Place 1', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/lusail.png') },
  { id: '2', name: 'Place 2', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/Login.jpg') },
  { id: '3', name: 'Place 3', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/lusail.png') },
  { id: '4', name: 'Place 4', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/Login.jpg') },
  { id: '5', name: 'Place 5', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/lusail.png') },
  { id: '6', name: 'Place 6', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/Login.jpg') },
  { id: '7', name: 'Place 7', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/lusail.png') },
  { id: '8', name: 'Place 8', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/Login.jpg') },
  { id: '9', name: 'Place 9', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/lusail.png') },
  { id: '10', name: 'Place 10', latitude: 37.78825, longitude: -122.4324, image: require('./../assets/images/Login.jpg') },
];

const getRandomPlaces = () => {
  const numberOfPlaces = Math.floor(Math.random() * 6) + 5; // Random number between 5 and 10
  return allPlaces.slice(0, numberOfPlaces);
};

const defaultLocation = { latitude: 37.78825, longitude: -122.4324 };

const MapPage = () => {
  const [currentLocation, setCurrentLocation] = useState(defaultLocation);
  const [placesVisited, setPlacesVisited] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setPlacesVisited(getRandomPlaces());

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 10000 },
      );
    };

    requestLocationPermission();
  }, []);

  const navigateToRealTimeTranslation = () => {
    navigation.navigate('RealTimeTranslationPage');
  };

  const navigateToEmergency = () => {
    navigation.navigate('EmergencyPage');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={currentLocation}
          title="You are here"
          pinColor="blue"
        />
        {placesVisited.map(place => (
          <Marker
            key={place.id}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
          />
        ))}
      </MapView>
      <FlatList
        data={placesVisited}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ImageBackground source={item.image} style={styles.listItem}>
            <Text style={styles.listItemText}>{item.name}</Text>
          </ImageBackground>
        )}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.translateButton]} onPress={navigateToRealTimeTranslation}>
          <Icon name="translate" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.avatarButton]}>
          <Icon name="person" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.photoAlbumButton]}>
          <Icon name="photo-album" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.emergencyButton]} onPress={navigateToEmergency}>
          <Icon name="local-hospital" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  listItem: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 5,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateButton: {
    backgroundColor: '#4CAF50', // Green
  },
  avatarButton: {
    backgroundColor: '#2196F3', // Blue
  },
  photoAlbumButton: {
    backgroundColor: '#FF9800', // Orange
  },
  emergencyButton: {
    backgroundColor: '#F44336', // Red
  },
});

export default MapPage;