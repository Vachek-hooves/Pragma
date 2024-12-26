import {useAppContext} from '../../store/context';
import ScrollLayout from '../../component/layout/ScrollLayout';
import ArchivedTask from '../../component/TabArchivedTasksScreen/ArchivedTask';

const TabArchivedTasksScreen = () => {
  const {archivedTasks} = useAppContext();

  const renderArchivedTasks = () => {
    return archivedTasks.map(task => {
      return (
        <ArchivedTask
          archivedTask={task}
          key={task.id}
          taskStatus={'Deleted Task'}
        />
      );
    });
  };
  return (
    <ScrollLayout title={'Deleted archive'}>
      {renderArchivedTasks()}
    </ScrollLayout>
  );
};

export default TabArchivedTasksScreen;
