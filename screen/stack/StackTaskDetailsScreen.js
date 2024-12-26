import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppContext} from '../../store/context';
// import {useNavigation} from '@react-navigation/native';
import TaskDetailsHeader from '../../component/StackTaskDetailsComponents/TaskDetailsHeader';
import CloseTaskBtn from '../../component/StackTaskDetailsComponents/CloseTaskBtn';
import TaskSaveCloseBtn from '../../component/StackTaskDetailsComponents/TaskSaveCloseBtn';

const StackTaskDetailsScreen = ({route, navigation}) => {
  //   const navigation = useNavigation();
  const {allTasks, updateTask} = useAppContext();
  const {taskId} = route.params;

  // Find the current task
  const task = allTasks.find(task => task.id === taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title);
  const [editedDescription, setEditedDescription] = useState(task?.description);

  if (!task) return null;

  const isTaskCompleted = task.milestones.every(milestone => milestone.done);

  const handleMilestoneToggle = async milestoneId => {
    const updatedMilestones = task.milestones.map(milestone =>
      milestone.id === milestoneId
        ? {...milestone, done: !milestone.done}
        : milestone,
    );

    await updateTask(taskId, {...task, milestones: updatedMilestones});
  };

  const handleSaveEdits = async () => {
    await updateTask(taskId, {
      ...task,
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditing(false);
  };
  const handleIsEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <TaskDetailsHeader onPress={handleIsEditing} />
      <ScrollView>
        {/* Title and Description */}
        <View style={styles.section}>
          {isEditing ? (
            <TextInput
              style={styles.titleInput}
              value={editedTitle}
              onChangeText={setEditedTitle}
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          ) : (
            <Text style={styles.title}>{task.title}</Text>
          )}

          <Text style={styles.date}>{task.dueDate}</Text>

          {isEditing ? (
            <TextInput
              style={styles.descriptionInput}
              value={editedDescription}
              onChangeText={setEditedDescription}
              multiline
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          ) : (
            <Text style={styles.description}>{task.description}</Text>
          )}
        </View>

        {/* Milestones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones</Text>
          {task.milestones.map((milestone, index) => (
            <View key={index} style={styles.milestoneRow}>
              <TextInput
                style={styles.milestoneInput}
                value={milestone.title}
                editable={false}
              />
              <TouchableOpacity
                style={[
                  styles.checkButton,
                  milestone.done && styles.checkButtonActive,
                ]}
                onPress={() => handleMilestoneToggle(milestone.id)}>
                <Icon
                  name={
                    milestone.done
                      ? 'checkmark-done-outline'
                      : 'checkmark-outline'
                  }
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      {isTaskCompleted ? (
        <CloseTaskBtn taskId={taskId} />
      ) : (
        <TaskSaveCloseBtn
          isEditing={isEditing}
          handleSaveEdits={handleSaveEdits}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16001E',
    paddingHorizontal: 26,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  titleInput: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    backgroundColor: '#3D2748',
    borderRadius: 8,
    padding: 12,
  },
  date: {
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 16,
  },
  description: {
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 20,
  },
  descriptionInput: {
    color: '#FFFFFF',
    backgroundColor: '#3D2748',
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneInput: {
    flex: 1,
    backgroundColor: '#3D2748',
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    marginRight: 12,
  },
  checkButton: {
    backgroundColor: '#3D2748',
    width: 48,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
  checkButtonActive: {
    backgroundColor: '#6F4D7B',
  },
  closeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 26,
    marginHorizontal: 16,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#16001E',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StackTaskDetailsScreen;
