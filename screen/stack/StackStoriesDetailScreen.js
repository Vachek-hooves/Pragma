import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollLayout from '../../component/layout/ScrollLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StackStoriesDetailScreen = ({route, navigation}) => {
  const {story} = route.params;

  const handleCloseBtn = async () => {
    try {
      // Get current read stories from storage
      const readStoriesStr = await AsyncStorage.getItem('readStories');
      let readStories = readStoriesStr ? JSON.parse(readStoriesStr) : [];

      // Check if story is already marked as read
      if (!readStories.includes(story.id)) {
        // Add story ID to read stories
        readStories.push(story.id);
        // Save updated read stories to storage
        await AsyncStorage.setItem('readStories', JSON.stringify(readStories));
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving read story:', error);
      navigation.goBack();
    }
  };

  return (
    <ScrollLayout title={'Reading Story'}>
      <View style={{marginHorizontal: 26, flex: 1}}>
        {/* Story Image */}
        <Image source={story.image} style={styles.storyImage} />

        {/* Story Title */}
        <Text style={styles.storyTitle}>{story.title}</Text>

        {/* Reading Time */}
        <View style={styles.timeContainer}>
          <Icon name="time-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.timeText}>3-4 minutes</Text>
        </View>

        {/* Story Content */}
        <Text style={styles.storyContent}>{story.story}</Text>

        {/* Moral */}
        <Text style={styles.moralTitle}>Moral:</Text>
        <Text style={styles.moralText}>
          {story.story.split('Moral:')[1]?.trim() ||
            'Reward yourself for progress, no matter how small.'}
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseBtn}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollLayout>
  );
};

const styles = StyleSheet.create({
  storyImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  storyTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeText: {
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4,
    fontSize: 14,
  },
  storyContent: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
    opacity: 0.8,
  },
  moralTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  moralText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 24,
    opacity: 0.8,
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 40,
  },
  closeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#16001E',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#6F4D7B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StackStoriesDetailScreen;
