import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity,Alert } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart, Grid,AreaChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


function DetailsScreen() {
  const datasetter = [0]
  const [xdata, setXdata] = useState(datasetter)
  const [ydata, setYdata] = useState(datasetter)
  const [zdata, setZdata] = useState(datasetter)
  const [subscription, setSubscription] = useState(null);
  const [counter, setCounter] = useState (0);
  const [timeElapsed, setTimeElapsed] = useState (0);
  const [startTimer, setStartTimer] = useState(false);

  let time = 0;
  let time2 = 0;
  let interval = 0;
  const waveLength = 500;
  const hitTime = 2000;
  const buffer = 500;
  const listenTime = 9000;
  global.timesHit = 0;
  const beginTime = Date.now();

  let data = {x: 0, y: 0, z: 0};

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(100);
  };

  const _interval = (time3) => {
    interval = Date.now() - time ;
    time = Date.now();
//    if(time2 == 0){
//      time2 = Date.now();
//    } else if (Date.now () - time2 > 4000) {
//      time2 = Date.now();
//      setCounter(0);
//    }
    console.log(interval)
    if((5500 > interval) && (interval > 4000)){
      console.log("hit!");
      setCounter(oldCounter => oldCounter + 1);
    }
  }

  const _subscribe = () => {
    setSubscription(
        Gyroscope.addListener(gyroscopeData => {
        data = gyroscopeData;
        const {x, y, z} = data
        if(y > 0.004 || y < -0.004){
//          console.log("0");
          _interval(y) ;
        } else {
//          console.log("1");
        }
        
        setTimeElapsed(Date.now() - beginTime);
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
  

 // const _handleUpdate = () => {
 //   if(ydata.length > 200) {
 //     setZdata(oldArray => [...oldArray.slice(1)]);
 //   } 
 // };
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
      data={ydata}
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
      data = {ydata}
      svg={{ stroke: 'rgb(134, 65, 244)' }}
      contentInset={contentInset}
      numberOfTicks={10}
    >
    <Grid />
    </LineChart>
    </View>
    <View>
    <Text>{counter}</Text>
    <Text>{Math.trunc(timeElapsed/1000)}</Text>
    <Text>{}</Text>
{/*
    <TouchableOpacity onPress={_slow}>
      <Text>Slow</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={_fast}>
      <Text>Fast</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
      <Text>{subscription ? 'On' : 'Off'}</Text>
    </TouchableOpacity>
    */}
  </View>
  </View>
);
  }
export default DetailsScreen;
