import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import api from '../api/api';
import { AuthContext } from '../state/AuthContext';

const VideoUploadScreen = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { token } = useContext(AuthContext);

  const selectVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Error', 'Could not select video.');
      } else if (response.assets && response.assets[0].uri) {
        setVideo(response.assets[0].uri);
      }
    });
  };

  const uploadVideo = async () => {
    if (!video) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('video', {
      uri: video,
      type: 'video/mp4', 
      name: 'upload.mp4',
    });

    try {
      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'Video uploaded successfully!');
    } catch (error) {
      console.error(error);
      Alert.alert('Upload Failed', 'An error occurred. Please try again.');
    } finally {
      setUploading(false);
      setVideo(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Video</Text>
      {video && (
        <View style={styles.videoPreviewContainer}>
          <Text>Selected Video:</Text>
          {/* Video preview is not straightforward in React Native, showing URI instead */}
          <Text style={styles.uriText}>{video}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button title="Select Video" onPress={selectVideo} />
        {video && <Button title="Upload Video" onPress={uploadVideo} disabled={uploading} />}
      </View>
      {uploading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  videoPreviewContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  uriText: {
    marginVertical: 10,
    fontSize: 12,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'space-around',
    height: 100,
  },
});

export default VideoUploadScreen;
