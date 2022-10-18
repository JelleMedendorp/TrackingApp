import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/home'
import DetailsScreen from './screens/other'
import GyroscopeScreen from './screens/gyroscope'

const Stack = createNativeStackNavigator();

function App( ) {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home"
      screenOptions={{
        orientation: 'landscape'
      }}>
        <Stack.Screen name="Home"
                      component={HomeScreen}
                      options={{ title : 'Homescreen'}} 
                      />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Gyroscope" component={GyroscopeScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;