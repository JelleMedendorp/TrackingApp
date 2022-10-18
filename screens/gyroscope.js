import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

function GyroscopeScreen({ route, navigation}) {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });
      const [subscription, setSubscription] = useState(null);

      const _slow = () => {
        Gyroscope.setUpdateInterval(1000);
      };
    
      const _fast = () => {
        Gyroscope.setUpdateInterval(16);
      };
    
      const _subscribe = () => {
        setSubscription(
          Gyroscope.addListener(gyroscopeData => {
            setData(gyroscopeData);
          })
        );
      };
    
      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };
    
      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);
      
      const {x, y, z} = data
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Gyroscope:</Text>
        <Text> x: {x} y: {x} z: {z}</Text>

        <View>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
export default GyroscopeScreen;