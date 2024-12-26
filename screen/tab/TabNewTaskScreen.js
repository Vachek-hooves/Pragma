import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAppContext} from '../../store/context';
import MainHeader from '../../component/TabScreenComponents/MainHeader';
import CalendarModal from '../../component/TabNewTaskComponent/CalendarModal';
import AnimationDone from '../../component/ui/AnimationDone';

const TabNewTaskScreen = ({navigation}) => {
  const {addTask} = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [milestones, setMilestones] = useState(['', '', '']);
  const [activeMilestoneCount, setActiveMilestoneCount] = useState(5);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSaveAnimation, setShowSaveAnimation] = useState(false);

  const handleSave = async () => {
    setShowSaveAnimation(true);
    
    // Delay navigation and state reset to show animation
    setTimeout(async () => {
      const newTask = {
        title,
        description,
        dueDate: selectedDate,
        milestones: milestones.filter(m => m !== ''),
        completed: false,
      };
      await addTask(newTask);
      
      setTitle('');
      setDescription('');
      setSelectedDate('');
      setMilestones(['', '', '']);
      setActiveMilestoneCount(5);
      setShowSaveAnimation(false);
      
      navigation.goBack();
    },3000); // Adjust timing based on your animation duration
  };

  const updateMilestone = (text, index) => {
    const newMilestones = [...milestones];
    newMilestones[index] = text;
    setMilestones(newMilestones);
  };

  const deleteMilestone = index => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setMilestones([...newMilestones, '']);
  };

  const adjustMilestones = count => {
    setActiveMilestoneCount(count);
    setMilestones(prev => {
      const newMilestones = [...prev];
      while (newMilestones.length < count) {
        newMilestones.push('');
      }
      return newMilestones.slice(0, count);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarModal
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onSelectDate={setSelectedDate}
        selectedDate={selectedDate}
      />

      {showSaveAnimation ? (
        <View style={styles.animationContainer}>
          <AnimationDone />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {/* Header */}
          <MainHeader title={'New Task'} />

          {/* Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Title"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={title}
              onChangeText={setTitle}
            />

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowCalendar(true)}>
              <Text style={styles.dateText}>{selectedDate || 'Select date'}</Text>
              <Icon name="calendar-outline" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description of task"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Milestones Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Milestones</Text>

            <View style={styles.milestoneCounter}>
              <TouchableOpacity
                style={[
                  styles.countButton,
                  activeMilestoneCount === 1 && styles.activeCount,
                ]}
                onPress={() => adjustMilestones(1)}>
                <Text style={styles.countText}>1 milestone</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.countButton,
                  activeMilestoneCount === 3 && styles.activeCount,
                ]}
                onPress={() => adjustMilestones(3)}>
                <Text style={styles.countText}>3 milestones</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.countButton,
                  activeMilestoneCount === 5 && styles.activeCount,
                ]}
                onPress={() => adjustMilestones(5)}>
                <Text style={styles.countText}>5 milestones</Text>
              </TouchableOpacity>
            </View>

            {milestones.slice(0, activeMilestoneCount).map((milestone, index) => (
              <View key={index} style={styles.milestoneRow}>
                <TextInput
                  style={styles.milestoneInput}
                  placeholder={`Milestone ${index + 1}`}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={milestone}
                  onChangeText={text => updateMilestone(text, index)}
                />
                <TouchableOpacity
                  onPress={() => deleteMilestone(index)}
                  style={styles.deleteButton}>
                  <Icon name="trash-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <View style={{height: 100}}></View>
    </SafeAreaView>
  );
};

export default TabNewTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16001E',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#6F4D7B' + 50,
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    borderWidth:1,
    borderColor: '#6F4D7B',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateInput: {
    backgroundColor: '#6F4D7B' + 50,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth:1,
    borderColor: '#6F4D7B',
  },
  dateText: {
    color: '#FFFFFF',
  },
  milestoneCounter: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#6F4D7B' + 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6F4D7B',
  },
  countButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#6F4D7B' + 50,
  },
  activeCount: {
    backgroundColor: '#6F4D7B',
    fontWeight: '600',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  milestoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneInput: {
    flex: 1,
    backgroundColor: '#6F4D7B' + 50,
    borderRadius: 8,
    padding: 16,
    color: '#FFFFFF',
    marginRight: 12,
    borderWidth:1,
    borderColor: '#6F4D7B',
  },
  saveButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    // marginTop: 10,
    marginBottom: 40,
    borderWidth: 1,
  },
  saveButtonText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '600',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#3D2748',
    borderRadius: 8,
    padding: 16,
    width: '90%',
  },
  closeButton: {
    backgroundColor: '#6F4D7B',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#6F4D7B',
    padding: 12,
    borderRadius: 8,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
