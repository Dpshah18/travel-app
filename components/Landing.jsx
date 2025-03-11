import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      {/* Top-right Logo */}
      <View style={styles.topRightLogo}>
        <Image
          source={require("./../assets/images/searcelogo.png")} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Center Logo */}
      <Image
        source={require("./../assets/images/image.png")} // Replace with your logo path
        style={styles.centerLogo}
        resizeMode="contain"
      />

      {/* Login & Signup Buttons */}
      <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={navigateToSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  topRightLogo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  centerLogo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1E90FF',
    padding: 20, // Increased padding
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#D3D3D3',
    padding: 20, // Increased padding
    borderRadius: 10,
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'black',
    fontSize: 20, // Increased font size
    fontWeight: 'bold',
  },
});

export default LandingPage;