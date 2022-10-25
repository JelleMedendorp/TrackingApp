import React, { useState, useEffect } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { PieChart } from "react-native-chart-kit";
import { Gyroscope } from 'expo-sensors';



function DetailsScreen({ route, navigation}) {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

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

  const pieData = [
    {
    name: "Data 1",
    value: x,
    color: "skyblue",
    legendFontColor: "#181818",
    legendFontSize: 15
    },
    {
    name: "Data 2",
    value: y,
    color: "blue",
    legendFontColor: "#181818",
    legendFontSize: 15
    },
    {
    name: "Data 3",
    value: z,
    color: "red",
    legendFontColor: "#181818",
    legendFontSize: 15
    },
    ];
    const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
    }; 
  //  const {x, y, z} = data
  //  const x = 10
  //  const y = 10
  //  const z = 10
  return (

    <View style={{flex:1,justifyContent:'space-evenly', alignItems: 'center' }}>
    <Text style={{ fontSize:30 }}>Pie Chart Data</Text>
    <PieChart
    data={pieData}
    width={500}
    height={220}
    chartConfig={chartConfig}
    accessor="value"
    backgroundColor="transparent"
    paddingLeft="20"
    absolute
    />
  
    </View>



    
    );
  }
export default DetailsScreen;
