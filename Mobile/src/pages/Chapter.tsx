import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupChapter } from '../utils/Group';
import { BibliaContext } from '../context/BibliaContext';
import colors from '../styles/colors';

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
            <Text style={styles.textBook}>Escolha o Capítulo do livro </Text>
            <Text style={styles.textChapter}>{book}</Text>
          </View>
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
  viewButtonBack:{
    position: 'relative',
    width: '10%'
  },
  buttonBack: {},
  iconBack:{
    fontSize: 42,
    //color: colors.white
  },
  viewHeaderTexts:{
    width: '89%',
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
  viewMain:{
		flex:1,
		width: '100%',
		justifyContent: 'center',
    padding: 10,
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