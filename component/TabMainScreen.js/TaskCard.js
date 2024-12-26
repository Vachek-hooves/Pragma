import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../store/context';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import AnimationDelete from '../ui/AnimationDelete';
import {useState} from 'react';

const TaskCard = ({task}) => {
  const navigation = useNavigation();
  const {deleteTask} = useAppContext();
  const [showDeleteAnimation, setShowDeleteAnimation] = useState(false);

  const handleOpenTask = () => {
    navigation.navigate('StackTaskDetailsScreen', {taskId: task.id});
  };

  const handleDeleteTask = () => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          setShowDeleteAnimation(true);
          setTimeout(() => {
            deleteTask(task.id);
          }, 2500);
        },
      },
    ]);
  };

  const lottieAnimation = () => {
    return (
      <LottieView
        source={require('../../assets/animations/graph.json')}
        style={{width: 202, height: 200}}
        autoPlay={true}
        loop={true}
        speed={1.8}
      />
    );
  };

  if (showDeleteAnimation) {
    return (
      <View style={styles.container}>
        <AnimationDelete />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Title and Description */}
      <Text style={styles.title} numberOfLines={1}>
        {task.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {task.description}
      </Text>

      {/* {lottieAnimation()} */}
      {/* Milestone Indicators */}
      <View style={styles.milestoneContainer}>
        {task.milestones.map((milestone, index) => (
          <View
            key={index + 1}
            style={[
              styles.milestoneIndicator,
              milestone.done && styles.milestoneDone,
              index === task.milestones.findIndex(m => !m.done) &&
                styles.milestoneActive,
            ]}>
            <Text style={styles.milestoneNumber}>{index + 1}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.openButton} onPress={handleOpenTask}>
          <Text style={styles.openButtonText}>Open task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={handleDeleteTask}>
          <Icon name="trash-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3D2748',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 16,
  },
  milestoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'center',
    gap: 8,
  },
  milestoneIndicator: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: '#2C1338',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
  milestoneDone: {
    backgroundColor: '#6F4D7B',
  },
  milestoneActive: {
    borderColor: '#FF9F0A',
    borderWidth: 2,
  },
  milestoneNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openButton: {
    flex: 1,
    backgroundColor: '#6F4D7B',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  iconButton: {
    backgroundColor: '#2C1338',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
});

export default TaskCard;
