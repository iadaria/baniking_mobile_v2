import React from 'react';
import { DestinationMap } from './screens/DestinationMap';
import { BathesPhotosScreen } from './screens/BathesPhotosScreen';
import { BathesScreen, BathScreen } from './screens';
import { BathesFilterScreen } from '../filters/screens/BathFilterScreen';
import { OrderCallScreen } from './screens/OrderCallScreen/OrderCallScreen';
import { SelectCityScreen } from '../cities/screens/SelectCityScreen';
import { routes } from '~/src/navigation/helpers/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Bathes = createNativeStackNavigator();

export default function BathesNavigator() {
  const { bathesTab: tab } = routes;

  return (
    <Bathes.Navigator
      //initialRouteName={tab.}
      screenOptions={{
        headerShown: false,
        orientation: 'portrait',
      }}>
      <Bathes.Screen name={tab.Bathes} component={BathesScreen} />
      <Bathes.Screen name={tab.SelectCity} component={SelectCityScreen} />
      <Bathes.Screen name={tab.BathesFilter} component={BathesFilterScreen} />
      <Bathes.Screen name={tab.Bath} component={BathScreen} />
      <Bathes.Screen name={tab.OrderCall} component={OrderCallScreen} />
      <Bathes.Screen name={tab.BathesPhotos} component={BathesPhotosScreen} />
      <Bathes.Screen name={tab.DestinationMap} component={DestinationMap} />
    </Bathes.Navigator>
  );
}
