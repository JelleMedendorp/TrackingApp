import React, { useState, useEffect } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Gyroscope } from 'expo-sensors';




function DiagramScreen({ route, navigation}) {
  const [chartData, setData] = useState(data)
  let maxYear = 2015
  const data = [
    { year: 2011, earnings: 13000 },
    { year: 2012, earnings: 16500 },
    { year: 2013, earnings: 14250 },
    { year: 2014, earnings: 19000 }
   ];

   const addData = () => {
    var d = [...chartData]
    var obj = {year: `${maxYear}`, earnings: Math.random() * (20000 - 10000) + 10000}
    d.push(obj)
    setData(d)
    maxYear++
   }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
    <VictoryBar data={data} x="quarter" y="earnings" />
</VictoryChart>
<Button onPress={addData} title="Add Earnings"/>
    </View>
  );
  }
export default DiagramScreen;

