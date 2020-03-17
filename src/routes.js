import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from './styles/colors';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        header: ({ navigation }) => {
          return <Header navigation={navigation} />;
        },
        cardStyle: {
          backgroundColor: `${colors.dark}`,
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
