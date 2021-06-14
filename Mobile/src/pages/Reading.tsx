import React, { useContext, useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, ScrollView, Dimensions, View, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import api from '../services/api';
import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupContent } from '../utils/Group';
import { verifyVerse } from '../utils/Verify';
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
  const [startPosition, setStartPosition] = useState(-1)
  const { book, chapter, verse } = routes.params as ParamsRoute;
  const scrollViewRef = React.useRef<ScrollViewRef | null>(null);
  const [highlight, setHighlight] = useState(false);
  useEffect(()=>{
    scrollViewRef.current?.scrollTo({x: 0, y: startPosition, animated: true});
    handleAnimation()
  },[startPosition]);

  const [animation, setAnimation] = useState(new Animated.Value(0))

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue:1,
      duration: 1000,
      useNativeDriver: false
    }).start( () => {
      Animated.timing(animation,{
        toValue:0,
        duration: 1000,
        useNativeDriver: false
      }).start()
    })
  }

  const boxInterpolation =  animation.interpolate({
    inputRange: [0, 1],
    outputRange:["#fff" , "rgb(90,210,244)"]
  })
  const animatedStyle = {
    backgroundColor: boxInterpolation
  }

  if(!biblias){
    return <></>
  }

  function onLayout(event: LayoutChangeEvent, item: string){
    const { x, y, height, width } = event.nativeEvent.layout;
    if(startPosition > -1) return;
    if(item.indexOf(verse) > -1){
      setStartPosition(y);
      //console.log({x, y, height, width, item})
      //console.log('Caiu aqui Brunão', y, item)
    }
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
            <Text style={styles.textBook}>{book}</Text>
            <Text style={styles.textChapter}>Capítulo {chapter}</Text>
          </View>
        </View>
				<View style={styles.viewMain}>
          <ScrollView
            
            ref={scrollViewRef}
          >
          {
            groupContent(biblias, book, chapter, verse).map((item)=>(
              <Animated.Text 
                // style={verifyVerse(item, verse) && styles.teste}
                
                style={verifyVerse(item, verse) && {...animatedStyle}}
                key={item} 
                onLayout={(event)=>onLayout(event, item)}
              >
                {item}
              </Animated.Text>
              )

            )
          }
          </ScrollView>
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
  buttonBack: {
  },
  iconBack:{
		fontSize: 42,
  },
  viewHeaderTexts:{
    alignItems: 'center',
    marginLeft: 10,
    alignContent: 'center'
  },
  textBook:{
    fontSize: 36
  },
  textChapter:{
    fontSize: 22
  },
  viewMain:{
		flex:1,
		width: '100%',
		justifyContent: 'center',
    padding: 10,
  },
  viewButtonBack:{
    position: 'relative'
  }
});