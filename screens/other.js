import * as React from 'react';
import { Button, View, Text, Dimensions } from 'react-native';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'



function DetailsScreen({ route, navigation}) {
    return (

  
  
  <View>
  <Text>Test chart</Text>
  <Chart
  style={{ height: '90%', width: '100%' }}
  data={[
    { x: 0, y: 10 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: -8 },
    { x: 4, y: 10 },
    { x: 5, y: 8 },
    { x: 6, y: -10 },
    { x: 7, y: 10 },
    { x: 8, y: -10 },
    { x: 9, y: 10 },
    { x: 10, y: 18 },
  ]}
  padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
  xDomain={{ min: 0, max: 10 }}
  yDomain={{ min: -10, max: 10 }}
>
  <VerticalAxis tickCount={11} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
  <HorizontalAxis tickCount={5} />
  <Area theme={{ gradient: { from: { color: '#ffa502' }, to: { color: '#ffa502', opacity: 0.4 } }}} />
  <Line theme={{ stroke: { color: '#ffa502', width: 5 }, scatter: { default: { width: 4, height: 4, rx: 2 }} }} />
</Chart>
</View>

    
    );
  }
export default DetailsScreen;
