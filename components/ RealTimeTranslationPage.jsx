import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { recognizeText } from '@react-native-ml-kit/text-recognition';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const LIBRE_TRANSLATE_API_URL = 'https://libretranslate.com/translate';

const translateText = async (text, sourceLang = 'en', targetLang = 'es') => {
  try {
    const response = await fetch(LIBRE_TRANSLATE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
    });
    const data = await response.json();
    return data.translatedText || 'Translation failed';
  } catch (error) {
    console.error('Translation error:', error);
    return 'Error translating';
  }
};

const RealTimeTranslationPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleTextRecognition = async (photoUri) => {
    try {
      const result = await recognizeText(photoUri);
      const extractedText = result.text || 'No text found';
      setRecognizedText(extractedText);

      const translated = await translateText(extractedText, 'en', 'es');
      setTranslatedText(translated);
    } catch (error) {
      console.error(error);
    }
  };

  const captureAndTranslate = async () => {
    if (!cameraRef.current) return;

    setIsProcessing(true);
    const photo = await cameraRef.current.takePictureAsync();
    await handleTextRecognition(photo.uri);
    setIsProcessing(false);
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} onCameraReady={captureAndTranslate} />
      <View style={styles.overlay}>
        <Text style={styles.recognizedText}>{recognizedText}</Text>
        <Text style={styles.translatedText}>{translatedText}</Text>
        {isProcessing && <ActivityIndicator color="white" />}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute', bottom: 50, backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10, borderRadius: 10, width: '90%', alignSelf: 'center',
  },
  recognizedText: { color: 'white', fontSize: 16 },
  translatedText: { color: 'yellow', fontSize: 18, marginTop: 5 },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 20,
  },
});

export default RealTimeTranslationPage;