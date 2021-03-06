import React from 'react';
import { Welcome } from './src/pages/Welcome';
import AppLoading from 'expo-app-loading';
import { useFonts, Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost';
import Routes from './src/routes';

export default function App() {
  const [ fonstsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fonstsLoaded){
    return <AppLoading/>    
  }

  return (       
      <Routes/>          
  );
}