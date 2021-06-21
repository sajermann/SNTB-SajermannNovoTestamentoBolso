import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupVerse } from '../utils/Group';
import { BibliaContext } from '../context/BibliaContext';
import colors from '../styles/colors';

interface ParamsRoute{
  book: string;
  chapter: string;
}

export function Verse(){
  const { biblias } = useContext(BibliaContext);
	const navigation = useNavigation();
  const routes = useRoute();
  const { book, chapter } = routes.params as ParamsRoute;
	function handleNavigateToReading(verse: string){
		navigation.navigate('Reading', {
      book,
      chapter,
      verse 
    });
	}

  useEffect(()=>{
    // console.log('entro no chapter', book)
  },[]);

  if(!biblias){
    return <></>
  }

	return(
    <SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
        <View style={styles.viewHeader}>
          <View style={styles.viewButtonBack}>
            <TouchableOpacity style={styles.buttonBack} activeOpacity={0.7} onPress={() => navigation.goBack()} >
              <MaterialIcons name="arrow-back" style={styles.iconBack} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewHeaderTexts}>
            <Text style={styles.textBook}>Escolha o Versículo do livro </Text>
            <Text style={styles.textChapter}>{book} capítulo {chapter}</Text>
          </View>
        </View>
				<View style={styles.viewMain}>
          <FlatList
            data={groupVerse(biblias, book, chapter)}
            keyExtractor={(item)=>String(item)}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonCard} activeOpacity={0.7} onPress={()=>handleNavigateToReading(item)} >
                <Text style={styles.textCard}>
                  {item}
                </Text>
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
  },
  viewHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  viewMain:{
		flex:1,
		width: '100%',
		justifyContent: 'center',
    padding: 10,
  },
  buttonBack: {
  },
  iconBack:{
		fontSize: 42,
  },
  viewHeaderTexts:{
    width: '89%',
    // flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  textBook:{
    fontSize: 22,
    overflow: 'scroll'
  },
  textChapter:{
    fontSize: 18
  },
  viewButtonBack:{
    position: 'relative',
    width: '10%'
  },
  buttonCard:{
    height: 50,
    borderTopWidth: 1,
    borderTopColor: colors.blue_dark,
    borderRightWidth: 1,
    borderRightColor: colors.blue_dark,
    borderBottomWidth: 1,
    borderBottomColor: colors.blue_dark,
    borderLeftWidth: 1,
    borderLeftColor: colors.blue_dark,
    width: '23%',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: colors.blue,
    fontSize: 22,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: '1%',
    borderRadius: 10,
  },
  textCard:{
    fontSize: 42,
    color: colors.white,
  },
});