import * as React from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen {Dimensions.get("window").width}</Text>
        <Button
          title="Go to Chart"
          onPress={() => navigation.navigate('Diagram')}
        />
        <Button
          title="Go to Gyroscopic data"
          onPress={() => navigation.navigate('Gyroscope')}
        />
        <Button
          title="Go to Other"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

export default HomeScreen;