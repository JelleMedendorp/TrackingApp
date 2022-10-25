import React, { useState, useEffect } from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'
import { Gyroscope } from 'expo-sensors';




function DiagramScreen({ route, navigation}) {
  const currentWitdh = 15;
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  let q = 0;
  const diagramData=[
    { x: 0, y: q }, 
  ]

  function changeQ(){
    q = q++;
  }

  const [subscription, setSubscription] = useState(null);
  const xx = 0
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
   
  

  return (

  
  
  <View>
  <Text>Test chart</Text>
  <Chart
  style={{ height: '90%', width: '100%' }}
  data={diagramData}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: currentWitdh }}
  yDomain={{ min: -10, max: 10 }}
>
  <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={5} />
 
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>

<Button
          title="Go to Other"
          onPress={changeQ()}
        />
      </View>


    
    );
  }
export default DiagramScreen;

