import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const TaskSaveCloseBtn = ({isEditing,handleSaveEdits}) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.closeButton} onPress={isEditing ? handleSaveEdits : () => navigation.goBack()}>
      <Text style={styles.closeButtonText}>
          {isEditing ? 'Save' : 'Close'}
        </Text>
    </TouchableOpacity>
  )
}

export default TaskSaveCloseBtn

const styles = StyleSheet.create({
    closeButton: {
        backgroundColor: '#6F4D7B',
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 8,
        marginBottom: 24,
        borderWidth: 1,
    borderColor: '#6F4D7B'
      },
      closeButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
      },
})