import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {WELCOME_DATA} from '../../data/welcomeData';
import Logo from '../../component/ui/Logo';
import StackLayout from '../../component/layout/StackLayout';

const StackWelcomeScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < WELCOME_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('TabNavigation');
    }
  };

  const handleSkip = () => {
    navigation.replace('TabNavigation');
  };

  const currentData = WELCOME_DATA[currentIndex];

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <Logo />

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{currentData.title}</Text>
        <Text style={styles.quote}>"{currentData.quote}"</Text>
        <Text style={styles.description}>{currentData.text}</Text>
      </View>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {WELCOME_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.getStartedButton} onPress={handleNext}>
          <Text style={styles.getStartedText}>
            {currentIndex === WELCOME_DATA.length - 1
              ? "Let's Start"
              : 'Get Started'}
          </Text>
        </TouchableOpacity>

        {currentIndex < WELCOME_DATA.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{height: 20}} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#16001E',
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: '#16001E',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  quote: {
    fontSize: 18,
    color: '#FFFFFF',
    fontStyle: 'italic',
    opacity: 0.8,
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'center',
    marginVertical: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6F4D7B',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    gap: 16,
    // marginBottom:150
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  getStartedText: {
    color: '#16001E',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
});

export default StackWelcomeScreen;
