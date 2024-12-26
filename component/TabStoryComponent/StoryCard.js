import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const StoryCard = ({story}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <Image source={story.image} style={styles.storyImage} />
      <View style={styles.cardContent}>
        <Text style={styles.storyTitle}>{story.title}</Text>
        <View style={styles.timeContainer}>
          <Icon name="time-outline" size={16} color="rgba(255,255,255,0.6)" />
          <Text style={styles.timeText}>3-4 minutes</Text>
        </View>
        <TouchableOpacity
          style={styles.readButton}
          onPress={() =>
            navigation.navigate('StackStoriesDetailScreen', {story})
          }>
          <Text style={styles.readButtonText}>Read now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#3D2748',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  storyImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  storyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeText: {
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 4,
    fontSize: 14,
  },
  readButton: {
    backgroundColor: '#6F4D7B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
