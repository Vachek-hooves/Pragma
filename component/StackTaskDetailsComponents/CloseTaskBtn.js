import {StyleSheet, Text,TouchableOpacity} from 'react-native';
import {useAppContext} from '../../store/context';
import { useNavigation } from '@react-navigation/native';

const CloseTaskBtn = ({taskId}) => {
    const navigation=useNavigation()
    const {closeTask}=useAppContext()
    const handleCloseTask = () => {
        closeTask(taskId)
        navigation.goBack()
    };
  return (
    <TouchableOpacity style={styles.taskCompleted} onPress={handleCloseTask}>
      <Text style={styles.taskCompletedText}>Close Task</Text>
    </TouchableOpacity>
  );
};

export default CloseTaskBtn;

const styles = StyleSheet.create({
  taskCompleted: {
    // backgroundColor: '#6F4D7B',
    backgroundColor: '#ffffff' + 50,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#6F4D7B'
  },
  taskCompletedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
