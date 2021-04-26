import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native';

import colors from '../styles/colors';
import { Header } from '../components/Header';
import fonts from '../styles/fonts';
import { EnviromentButton } from '../components/EnviromentButton';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';

interface EnvironmentProps {
  key: string;
  title: string;
}

interface PlantProps {  
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
   }
}

export function PlantSelect(){
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentsSelected, setEnvironmentsSelected] = useState('all');
  
function handleEnvironmentSelected(environment: string){
  setEnvironmentsSelected(environment);
  if(environment == 'all'){
    return setFilteredPlants(plants);
  }

  const filtered = plants.filter(plant =>
      plant.environments.includes(environment)
    );

    setFilteredPlants(filtered);
}

  useEffect(()=>{
    async function fetchEnviroment() {
      const {data} = await api.
      get('plants_environments?_sort=title&_order=asc');
      setEnvironments([
        {
          key:'all',
          title: 'Todos',
        },
        ...data
      ]);
    }

    fetchEnviroment();

  },[]);

  useEffect(()=>{
    async function fetchPlants() {
      const {data} = await api.
      get('plants?_sort=name&_order=asc');
      setPlants(data);
    }

    fetchPlants();

  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header/>
        <Text style={styles.title}>
          Em qual hambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>
      <View>
        <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
          data={environments}
          renderItem={({item})=>( 
            <EnviromentButton 
              title={item.title}
              active={item.key === environmentsSelected}                     
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
        > 
        </FlatList>        
      </View>
      <View style={styles.plants}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          data={filteredPlants}
          renderItem={({item})=>(
            <PlantCardPrimary  
              data={item}                           
            />
          )}
        />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,    
  },
  header: {
    paddingHorizontal:30,
  },
  title: {   
    fontSize: 17, 
    color: colors.heading,   
    fontFamily:fonts.heading, 
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {    
    fontSize:17, 
    lineHeight:20,
    color: colors.heading,
    fontFamily:fonts.text,
  },
  enviromentList:{
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,    
  },
  plants: {
    flex: 1,
    paddingHorizontal:32,
    justifyContent: 'center'
  },
  contentContainer:{    
  }
})