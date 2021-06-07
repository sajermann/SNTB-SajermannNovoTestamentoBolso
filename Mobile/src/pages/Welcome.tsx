import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { TextInput } from 'react-native-gesture-handler';

export function Welcome(){
  const [biblias, setBiblias] = useState<Biblia[]>()
	const navigation = useNavigation();

	function handleStart(){
		navigation.navigate('UserIdentification');
	}

  useEffect(()=>{
    async function loadBiblias(){
      
      const { data } = await api.get<Biblia[]>('/PocketNewTestament');
      setBiblias(data);
      
    };
    loadBiblias();
  },[]);

	return(
    <SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
        <View style={styles.viewFilter}>
      <TextInput
        style={styles.inputFilter} 
        placeholder="Pesquisar"
        // onBlur={handleInputBlur}
        // onFocus={handleInputFocus}
        // onChangeText={handleInputChange}
      />
      <TouchableOpacity style={styles.buttonFilter} activeOpacity={0.7} onPress={handleStart} >
            <Feather name="search" style={styles.buttonFilterIcon} />
					</TouchableOpacity>
          </View>
				{
          biblias?.length != undefined &&(
          biblias.map((item)=>(
            <Text style={styles.subtitle}>Item: {item.titulo}</Text>
          ))
          )
        }
				<Text>Oi</Text>
					<TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart} >
            <Feather name="star" style={styles.buttonIcon} />
						<Text style={styles.textFavorites}>
              Favoritos
						</Text>
					</TouchableOpacity>
			</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
	wrapper:{
		flex: 1,
		justifyContent: 'space-around',
    alignItems: 'center',
		// paddingHorizontal: 20 
	},
  inputFilter:{
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderBottomColor: 'gray',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
		color: 'gray',
		width: '50%',
    height: 50,
		fontSize: 18,
		// marginTop: 50,
		padding: 10,
		textAlign: 'center'
	},
  buttonFilter:{
    width: 50,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  viewFilter:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFilterIcon:{
    color: '#fff',
    fontSize: 32,

  },
  title:{
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',

      marginTop: 40,

			lineHeight: 34
  },
  subtitle:{
      textAlign: 'center',
      fontSize: 18,
      paddingHorizontal: 20,
      color: 'red'
  },
	image:{
			height: Dimensions.get('window').width * .7
	},
  button: {
      backgroundColor: 'green',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      // borderRadius: 16,
      // marginBottom: 10,
      height: 100,
      width: '100%',
      marginBottom: -5
  },
  buttonIcon:{
		fontSize: 52,
		color: '#fff'
  },
  textFavorites:{
    color: '#fff',
    fontSize: 52
  }
})