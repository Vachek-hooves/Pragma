import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import StackLayout from '../../component/layout/StackLayout';

const StackUserScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedUserName = await AsyncStorage.getItem('userName');
      const savedUserImage = await AsyncStorage.getItem('userImage');

      if (savedUserName && savedUserImage) {
        setUserName(savedUserName);
        setUserImage(savedUserImage);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleImagePick = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.assets && result.assets[0]?.base64) {
        const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setUserImage(imageUri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSave = async () => {
    if (!userName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (!userImage) {
      Alert.alert('Error', 'Please select a profile image');
      return;
    }

    try {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('userImage', userImage);
      setIsEditing(false);
      Alert.alert('Success', 'Profile saved successfully');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userName');
              await AsyncStorage.removeItem('userImage');
              setUserName('');
              setUserImage(null);
              setIsEditing(true);
            } catch (error) {
              console.error('Error deleting user data:', error);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <StackLayout>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Profile Image Section */}
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={isEditing ? handleImagePick : null}>
            {userImage ? (
              <Image source={{uri: userImage}} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="person-outline" size={40} color="#FFFFFF" />
              </View>
            )}
            {isEditing && (
              <View style={styles.editImageOverlay}>
                <Icon name="camera" size={24} color="#FFFFFF" />
              </View>
            )}
          </TouchableOpacity>

          {/* Name Input Section */}
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={setUserName}
              placeholder="Enter your name"
              placeholderTextColor="#6F4D7B"
            />
          ) : (
            <Text style={styles.userName}>{userName}</Text>
          )}

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            {isEditing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Profile</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}>
                  <Text style={styles.deleteButtonText}>Delete Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </StackLayout>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#6F4D7B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#16001E',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    width: 220,
    height: 220,
    borderRadius: 60,
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    backgroundColor: '#3D2748',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editImageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6F4D7B',
    borderRadius: 20,
    padding: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#2C1338',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6F4D7B',
    maxWidth: '80%',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    maxWidth: '80%',
  },
  saveButton: {
    backgroundColor: '#6F4D7B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#3D2748',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#2C1338',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: '#FF4D4D',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StackUserScreen;
