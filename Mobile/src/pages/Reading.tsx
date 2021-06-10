import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, ScrollView, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupContent } from '../utils/Group';
import { BibliaContext } from '../context/BibliaContext';
import { LayoutChangeEvent } from "react-native";

interface ParamsRoute{
  book: string;
  chapter: string;
  verse: string;
}

type ScrollViewRef = ScrollView & {
  flashScrollIndicators: () => void;
};

export function Reading(){
  const { biblias } = useContext(BibliaContext);
	const navigation = useNavigation();
  const routes = useRoute();
  const [startPosition, setStartPosition] = useState(0)
  const { book, chapter, verse } = routes.params as ParamsRoute;
  const scrollViewRef = React.useRef<ScrollViewRef | null>(null);
  useEffect(()=>{
    scrollViewRef.current?.scrollTo({x: 0, y: startPosition, animated: true})
  },[startPosition]);

  if(!biblias){
    return <></>
  }

  function onLayout(event: LayoutChangeEvent, item: string){
    const { x, y, height, width } = event.nativeEvent.layout;
    if(startPosition > 0) return;
    if(item.indexOf(verse) > -1){
      setStartPosition(y);
      //console.log({x, y, height, width, item})
      console.log('Caiu aqui Brunão', item)
    }
  }

	return(
    <SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
        <View style={styles.viewHeader}>
          <Text>{book}</Text>
          <Text>Capítulo {chapter}</Text>
        </View>
				<View style={styles.viewMain}>
          <ScrollView
            
            ref={scrollViewRef}
          >
          {
            groupContent(biblias, book, chapter, verse).map((item)=>(
              <Text key={item} onLayout={(event)=>onLayout(event, item)}>{item}</Text>
              )

            )
          }
          </ScrollView>
          {/* <FlatList

            data={groupContent(biblias, book, chapter, verse)}
            keyExtractor={(item)=>String(item)}
            renderItem={({item})=>(
              <View style={styles.buttonCard}>
                <Text style={styles.textCard}>
                  {item}
                </Text>
                
              </View>
            )}
            
            showsVerticalScrollIndicator={true}
          /> */}
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
    // height: 50,
    // borderTopWidth: 1,
    // borderRightWidth: 1,
    // borderBottomWidth: 1,
    // borderLeftWidth: 1,
    // width: '23%',
    // marginTop: 5,
    // marginBottom: 5,
    // backgroundColor: '#53f83d',
    // fontSize: 22,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // padding: 5,
    // margin: '1%'
  },
  textCard:{
    // textAlign: 'center',
    fontSize: 18,
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