import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupChapter } from '../utils/Group';
import { BibliaContext } from '../context/BibliaContext';

interface ParamsRoute{
  book: string;
}

export function Chapter(){
  const { biblias } = useContext(BibliaContext);
	const navigation = useNavigation();
  const routes = useRoute();
  const { book } = routes.params as ParamsRoute;
	function handleNavigateToVerse(chapter: string){
		navigation.navigate('Verse', {
      book,
      chapter 
    });
	}

  useEffect(()=>{
    console.log('entro no chapter', book)
  },[]);

  if(!biblias){
    return <></>
  }

	return(
    <SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
        <View style={styles.viewHeader}>
          <Text>Escolha o capítulo do livro</Text>
          <Text>{book}</Text>
        </View>
				<View style={styles.viewMain}>
          <FlatList
            data={groupChapter(biblias, book)}
            keyExtractor={(item)=>String(item)}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonCard} activeOpacity={0.7} onPress={()=>handleNavigateToVerse(item)} >
                <Text style={styles.textCard}>
                  {item}
                </Text>
                {/* <Feather name="arrow-right" style={styles.iconEnter} />  */}
              </TouchableOpacity>
            )}
            numColumns={4}
            showsVerticalScrollIndicator={true}
          />
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
    flexDirection: 'column',
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
    width: '23%',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#53f83d',
    fontSize: 22,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: '1%'
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