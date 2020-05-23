import React from 'react'
import { View,StyleSheet,ImageBackground,Text } from 'react-native'

import MyButton from './button'
import {vars,colors} from '../global_vars'

import Icon from 'react-native-vector-icons/MaterialIcons';

const CardButton = ({props,title,handleClick,iconName}) => {
    return (
      <MyButton onPress={() => handleClick()} alignItems="flex-start" >

        <View style={styles.container} >
          {
            iconName && (
              <Icon style={styles.Icon} name={iconName} size={23} color={colors.beyaz} />
            )
          }
          <Text style={styles.text}>
              {title}
          </Text >
      
        </View>
      </MyButton>  

    )
}

const styles = StyleSheet.create({
    container: {
      alignItems:"center",
      justifyContent:"flex-start",
      borderRadius:3,
      backgroundColor:"#5869FF",
      width: "95%", height: 50,
      marginBottom:13,
      flexDirection:"row",
      paddingStart:9,
    },
  
    text: {
      color: "white",
      fontSize: 15,
      marginLeft:11,
      fontWeight: "bold"
    }
  });

export default CardButton