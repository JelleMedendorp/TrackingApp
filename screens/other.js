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
  const [hits, setHits] = useState(0)
  const [subscription, setSubscription] = useState(null);

  let time = 0;
  let interval = 0;
  const waveLength = 500;
  const hitTime = 2000;
  const buffer = 500;
  const listenTime = 9000;
  let beginTime = Date.now();
  global.timesHit = 0;

  let data = {x: 0, y: 0, z: 0};

  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(100);
  };

  const _interval = (y) => {
    interval = Date.now() - time + waveLength;
    time = Date.now();
    if((1500 < interval) && (interval < 2500)){
      console.log("hit!");
      let tempHit = hits
      console.log(tempHit);
      setHits(1);
      console.log(hits);

    }
              
  }

  const _subscribe = () => {
    setSubscription(
        Gyroscope.addListener(gyroscopeData => {
        data = gyroscopeData;
        const {x, y, z} = data
      //  console.log(Date.now());
        if(y > 1 || y < -1){
          _interval(y) ;
        }
//        console.log(hits);
        if(hits == 1){
          beginTime = Date.now();
        }
//        console.log(Date.now() - beginTime);

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
//  _handleUpdate();
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
  <View style={{ height: 200, flexDirection: 'row' }}>
    <YAxis
      data={graphData}
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
      data = {graphData}
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
    <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
      <Text>{subscription ? 'On' : 'Off'}</Text>
    </TouchableOpacity>
  </View>
);
  }
export default DetailsScreen;
