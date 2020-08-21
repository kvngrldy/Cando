import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'
import Todo from './screens/Todo'
import TodoDetail from './screens/TodoDetail'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './screens/Profile'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTasks, faUser } from '@fortawesome/free-solid-svg-icons'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function TodoAndProfile({route}) {
  return (
    <Tab.Navigator value={route.params} tabBarOptions={{showLabel: true, showIcon: true}} >
      <Tab.Screen options={{tabBarIcon: () => (<FontAwesomeIcon icon={faTasks} /> )}} name="TASKS" component={Todo} />
      <Tab.Screen options={{tabBarIcon: () => (<FontAwesomeIcon icon={faUser} /> )}} name="PROFILE" component={Profile} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="TodoPage" component={TodoAndProfile} />
          <Stack.Screen name="DETAIL" component={TodoDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App