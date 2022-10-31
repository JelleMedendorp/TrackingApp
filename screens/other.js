import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity,Alert } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart, Grid,AreaChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


function DetailsScreen() {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const datasetter = [0]
  const [array, setArray] = useState(datasetter)
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
    _handleUpdate();
    return () => _unsubscribe();
  }, []);
  
  const {x, y, z} = data
  const _handleUpdate = () => {
    if(array.length < 200) {
      setArray(oldArray => [...oldArray, y])
    } else {
      setArray(oldArray => [...oldArray.slice(1), y])
    }
  };

  setInterval(_handleUpdate, 6000);

  const contentInset = { top: 20, bottom: 20 }
return (

    
  <View style={{ height: 200, flexDirection: 'row' }}>
                      <YAxis
                    data={array}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={10}
                    formatLabel={(value) => `${value}`}
                />
   <LineChart
                style={{ flex: 1, marginLeft: 16 }}
                data={array}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={contentInset}
                numberOfTicks={10}
            >
                <Grid />
            </LineChart>
            <TouchableOpacity onPress={_slow}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast}>
          <Text>Fast</Text>
        </TouchableOpacity>
  </View>
);
  }
export default DetailsScreen;
