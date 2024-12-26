import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AppContext} from './store/context';
import {
  StackTaskDetailsScreen,
  StackWelcomeScreen,
  StackStatisticsScreen,
  StackStoriesDetailScreen,
  StackUserScreen,
} from './screen/stack';
import TabNavigation from './TabNavigator/TabNavigation';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AppContext>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="StackWelcomeScreen"
            component={StackWelcomeScreen}
          />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen
            name="StackTaskDetailsScreen"
            component={StackTaskDetailsScreen}
          />
          <Stack.Screen
            name="StackStatisticsScreen"
            component={StackStatisticsScreen}
          />
          <Stack.Screen
            name="StackStoriesDetailScreen"
            component={StackStoriesDetailScreen}
          />
          <Stack.Screen name="StackUserScreen" component={StackUserScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext>
  );
}

export default App;
