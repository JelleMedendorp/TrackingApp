import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity,Alert } from 'react-native';
import { LineChart, Grid,AreaChart, YAxis } from 'react-native-svg-charts'
import { Gyroscope } from 'expo-sensors';




function DiagramScreen() {
  const datasetter = [0]
  const [xdata, setXdata] = useState(datasetter)
  const [ydata, setYdata] = useState(datasetter)
  const [zdata, setZdata] = useState(datasetter)
  const [subscription, setSubscription] = useState(null);

  let data = {x: 0, y: 0, z: 0};

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(100);
  };

  const _subscribe = () => {
    setSubscription(
        Gyroscope.addListener(gyroscopeData => {
        data = gyroscopeData;
        const {x, y, z} = data
        setXdata(oldArray => [...oldArray, x]);
        setYdata(oldArray => [...oldArray, y]);
        setZdata(oldArray => [...oldArray, z]);


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

  const contentInset = { top: 20, bottom: 20 }
  const graphData = [
    {
        data: xdata.slice(-200),
        svg: { stroke: 'blue'},
    },
    {
      data: ydata.slice(-200),
      svg: { stroke: 'green'},
    },
    {
      data: zdata.slice(-200),
      svg: { stroke: 'red'},
    },
  ]
return (   
  <View> 
  <View style={{ height: 200, flexDirection: 'row' }}>
    <YAxis
      data={ydata.slice(-200)}
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
      data = {ydata.slice(-200)}
      svg={{ stroke: 'rgb(134, 65, 244)' }}
      contentInset={contentInset}
      numberOfTicks={10}
    >
    <Grid />
    </LineChart>
    </View>
    <View>

    <TouchableOpacity onPress={_slow}>
      <Text>Slow</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={_fast}>
      <Text>Fast</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
      <Text>{subscription ? 'On' : 'Off'}</Text>
    </TouchableOpacity>
  </View>
  </View>
);
}
export default DiagramScreen;
