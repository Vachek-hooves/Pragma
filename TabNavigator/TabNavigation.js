import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  TabArchivedTasksScreen,
  TabMainScreen,
  TabNewTaskScreen,
  TabBookmarkedQuotes,
  TabCompoletedTasks,
  TabStoriesScreen,
} from '../screen/tab';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.3)',
      }}>
      <Tab.Screen
        name="Tasks"
        component={TabMainScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="document-text-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={TabBookmarkedQuotes}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="bookmark-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component=
        {TabNewTaskScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.addButtonContainer}>
              <Icon
                name="add"
                size={55}
                color="#FFFFFF"
                style={{
                  backgroundColor: '#FF9F0A',
                  width: 82,
                  height: 82,
                  borderRadius: 41,
                  textAlign: 'center',
                  lineHeight: 82,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Delete"
        component={TabStoriesScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="book-outline" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={TabCompoletedTasks}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="tasks" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#6F4D7B' + 50,
    borderTopWidth: 1,
    height: 70,
    position: 'absolute',
    bottom: 20,
    // left: 24,
    // right: 24,
    borderRadius: 30,
    elevation: 0,
    // paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#6F4D7B',
    marginHorizontal: 16,
  },
  addButtonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
