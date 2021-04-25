import React from 'react';

import {
  StyleSheet,
  View, 
  Text,  
  Image
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import userImg from '../assets/vini.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
  return(
    <View style={styles.container}>
      <View >
        <Text style={styles.greeting}>Ola,</Text>
        <Text style={styles.userName}>Vinicius</Text>
      </View>
        <Image style={styles.image} source={userImg}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',    
    flexDirection:'row',
    justifyContent: 'space-between',    
    alignItems: 'center',
    paddingVertical:20,
    marginTop:getStatusBarHeight(),      
  }, 
  image:{
    width:80,
    height:80,
    borderRadius:40,
  },
  greeting:{
    fontSize:32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName:{
    fontSize:32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight:40,
  }

})