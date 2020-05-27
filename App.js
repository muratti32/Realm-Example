import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/Home'
import AracEkle from './components/AracEkle'
import KisiEkle from './components/KisiEkle'
import VeriSil from './components/VeriSil'
import VeriGoster from './components/VeriGoster'

import {vars,colors} from './global_vars';

const App = () => {

  const Stack = createStackNavigator();

  //Her bir stack screen için aynı headerOption kullanmak için önceden tanımladık
  const headerOptions = (title) => {
    return (
      {
        title: title, 
        headerStyle: { backgroundColor: colors.mavi,},
        headerTintColor: colors.beyaz,
        headerTitleStyle: { fontWeight: 'bold',},
      }
    )
    
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="home" 
          component={Home}  
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name={vars.navigate_kisi_ekle} 
          component={KisiEkle} 
          options={headerOptions("Add Person")}
        />

        <Stack.Screen 
          name={vars.navigate_arac_ekle} 
          component={AracEkle} 
          options={headerOptions("Add Car")}
        />
        <Stack.Screen 
          name={vars.navigate_veri_sil} 
          component={VeriSil} 
          options={headerOptions("Delete Items")}
        />
        <Stack.Screen 
          name={vars.navigate_veri_goster} 
          component={VeriGoster} 
          options={headerOptions("Browse Items")}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;