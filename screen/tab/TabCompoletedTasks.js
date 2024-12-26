import {useAppContext} from '../../store/context';
import ScrollLayout from '../../component/layout/ScrollLayout';
import ArchivedTask from '../../component/TabArchivedTasksScreen/ArchivedTask';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import MainHeader from '../../component/TabScreenComponents/MainHeader';

const TabCompoletedTasks = () => {
  const {allCompletedTasks} = useAppContext();

  const renderCompletedTasks = () => {
    return allCompletedTasks.map(task => {
      return (
        <ArchivedTask
          key={task.id}
          archivedTask={task}
          taskStatus={'Completed Task'}
        />
      );
    });
  };
  return (
    <View style={styles.mainContainer}>
      <SafeAreaView />
      <MainHeader title={'Completed Tasks'} />
      <ScrollView style={styles.scrollViewContainer}>
        {/* <ScrollLayout title={'Completed Tasks'}> */}
        {renderCompletedTasks()}
        {/* </ScrollLayout> */}
      </ScrollView>
      <View style={{height: 130}} />
    </View>
  );
};

export default TabCompoletedTasks;

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    paddingTop: 50,
  },
  mainContainer: {
    backgroundColor: '#16001E',
    flex: 1,
  },
});
