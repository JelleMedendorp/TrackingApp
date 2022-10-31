import React, { useState, useEffect } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
import { Gyroscope } from 'expo-sensors';




function DiagramScreen({ route, navigation}) {
  
  const dataset = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80, 90]
  const [data, setData] = useState(dataset)


  const _handleUpdate = () => {
    console.log('added data');
    setData(oldArray => [...oldArray, 20])
  };

  return (
    <View>
    <LineChart
    style={{ height: 200 }}
    data={data}
    svg={{ stroke: 'rgb(134, 65, 244)' }}
    contentInset={{ top: 20, bottom: 20 }}
>
    <Grid />
</LineChart>
<Button
      onPress={_handleUpdate}
      title="Learn More"
      color="#841584"
      accessibilityLabel="Learn more about this purple button"
/></View>

  );
  }
export default DiagramScreen;

