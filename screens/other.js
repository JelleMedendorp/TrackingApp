//Jelle Medendorp
//S1027748
//2022

import React, { useState, useEffect } from 'react';
import { Button, View, Text, TouchableOpacity,Alert } from 'react-native';
import { Gyroscope } from 'expo-sensors';
import { LineChart, Grid,AreaChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'


function DetailsScreen() {
  //States
  const datasetter = [0]
  const [xdata, setXdata] = useState(datasetter)
  const [ydata, setYdata] = useState(datasetter)
  const [zdata, setZdata] = useState(datasetter)
  const [subscription, setSubscription] = useState(null);
  const [counter, setCounter] = useState (0);
  const [timeElapsed, setTimeElapsed] = useState (0);
  const [binary, setBinary] = useState([]);

  //Constants
  let time = 0;
  let interval = 0; 
  const waveTime = 1000;
  const betweenTime = 3000;
  const hitTime = 3000;
  const buffer = 1000;
  const listenTime = 9000;
  global.timesHit = 0;
  const beginTime = Date.now();
  let data = {x: 0, y: 0, z: 0};

  //Set interval faster or slower
  const _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  };

  const _fast = () => {
    Gyroscope.setUpdateInterval(100);
  };

  //Calculate the interval between "Hits", and differt this to binary
  const _interval = (time3) => {

  // Below is untested but made so that the first wave is also enterpreted as a 1
  //  if(time = 0){
  //    console.log("1");
  //    setBinary(oldArray => [...oldArray, 1]);
  //  }
    interval = Date.now() - time ;
    time = Date.now();
  //console.log(interval) -- Check intervals for debugging
    if(((hitTime + 1000) > interval) && (interval > (hitTime -1000))){
      console.log("1");
      setBinary(oldArray => [...oldArray, 1]);
    } else if ((((2*hitTime+waveTime) + 1000) > interval) && (interval > ((2*hitTime+waveTime) -1000))){
      console.log("01") 
      setBinary(oldArray => [...oldArray,0,1]);
    } else if ((((3*hitTime+waveTime) + 1000) > interval) && (interval > ((3*hitTime+waveTime) -1000))){
      setBinary(oldArray => [...oldArray,0,0,1]);
      console.log("001") 
    }
}

 // const _intervalListener
//Subscription on the gyroscope and sends us to interval function if there is a peak
  const _subscribe = () => {
    setSubscription(
        Gyroscope.addListener(gyroscopeData => {
        data = gyroscopeData;
        const {x, y, z} = data
        if(y > 0.04 || y < -0.04){
          _interval(y) ;
        } else {
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

//Use Effect
  useEffect(() => { 
    _subscribe();
    return () => _unsubscribe();
  }, []);
  
//contentInset for the graph  
  const contentInset = { top: 20, bottom: 20 }

//Data for the graph if we want to see all 3 dimensions 
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

//Return that gets loaded on the sceen
return (   
  <View> 
  <View style={{ height: 200, flexDirection: 'row' }}>

    {/* YAxis for displaying the Y axis */}
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
    {/* Displays graph */}             
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

    {/* Counts number of hits and gives us the time elapsed in seconds*/}  
    <Text>{counter}</Text>
    <Text>{Math.trunc(timeElapsed/1000)}</Text>
    <Text>{binary}</Text>
  </View>
  </View>
);
  }
export default DetailsScreen;
