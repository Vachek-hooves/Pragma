import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TaskDetailsHeader = ({onPress}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.goBack()}>
        <AntDesign name="back" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Task</Text>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={onPress}>
        <FontAwesome name="edit" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskDetailsHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  iconButton: {
    // width: 40,
    // height: 40,
    borderRadius: '50%',
    backgroundColor: '#6F4D7B' + 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#6F4D7B' + 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 15,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
