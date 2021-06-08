import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';

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
        <View style={styles.viewHeader}>
          <TextInput
            style={styles.inputSearch} 
            placeholder="Pesquisar"
            // onBlur={handleInputBlur}
            // onFocus={handleInputFocus}
            // onChangeText={handleInputChange}
          />
          <TouchableOpacity style={styles.buttonSearch} activeOpacity={0.7} onPress={handleStart} >
            <Feather name="search" style={styles.iconSearch} />
          </TouchableOpacity>
        </View>
				<View style={styles.viewMain}>
          <FlatList
            data={biblias}
            keyExtractor={(item)=>String(item.id)}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonCard} activeOpacity={0.7} onPress={handleStart} >
                <Text style={styles.textCard}>
                  {item.titulo}
                </Text>
                <Feather name="arrow-right" style={styles.iconEnter} /> 
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
          />
        </View>
        <View style={styles.viewFooter}>
					<TouchableOpacity style={styles.buttonFavorite} activeOpacity={0.7} onPress={handleStart} >
            <Feather name="star" style={styles.iconFavorite} />
						<Text style={styles.textFavorite}>
              Favoritos
						</Text>
					</TouchableOpacity>
        </View>
			</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30
  },
  wrapper:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // paddingHorizontal: 20 
  },
  viewHeader:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSearch:{
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
  buttonSearch:{
    width: 50,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  iconSearch:{
    color: '#fff',
    fontSize: 32,
  },
  viewMain:{
		flex:1,
		width: '100%',
		justifyContent: 'center',
    padding: 10,
  },
  buttonCard:{
    height: 50,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#53f83d',
    fontSize: 22,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  textCard:{
    // textAlign: 'center',
    fontSize: 42,
    color: 'red',
  },
  iconEnter:{
    color: 'black',
    fontSize: 42
  },
  viewFooter:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonFavorite: {
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
  iconFavorite:{
		fontSize: 52,
		color: '#fff'
  },
  textFavorite:{
    color: '#fff',
    fontSize: 52
  },
  

})