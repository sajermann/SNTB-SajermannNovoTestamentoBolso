import React, { useContext, useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, ScrollView, View, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { BibliaContext } from '../context/BibliaContext';

interface ParamsRoute{
  book: string;
  chapter: string;
}

export function About(){
  const { biblias } = useContext(BibliaContext);
	const navigation = useNavigation();
  const routes = useRoute();
 
  function handleIconsNavigation(site: string){
    Linking.canOpenURL(site).then(supported => {
      if (supported) {
        Linking.openURL(site);
      } else {
        console.log("Don't know how to open URI: " + site);
      }
    });
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
        </View>
				<View style={styles.viewMain}>
          <ScrollView>
            <Text style={styles.textAboutHeader}>Sobre o aplicativo!</Text>
            <Text style={styles.textAboutDeveloper}>Desenvolvedor</Text>
            <Text style={styles.textAboutDeveloper}>Bruno Sajermann</Text>
            <View style={styles.viewSocialIcons}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleIconsNavigation('https://github.com/sajermann')} >
                <AntDesign name="github" size={36} color="black" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleIconsNavigation('https://www.linkedin.com/in/devbrunosajermann/')} >
                <AntDesign name="linkedin-square" size={36} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={styles.textAboutDescription}>
              Esse aplicativo foi desenvolvido como base de estudos, com objetivo
              de aprendizado e também de replicar o livro Novo Testamento -
              Salmos e Provérbios.
            </Text>
            <Text style={styles.textAboutDescription}>
              As informações para manter esse aplicativo atualizado ficam 
              armazenados em um servidor com custo mensal, se esse aplicativo 
              lhe foi útil de alguma maneira e você queira nos ajudar, por favor 
              considere uma doação através do Paypal.
            </Text>
            <View style={styles.viewSocialIcons}>
              <TouchableOpacity activeOpacity={0.7} onPress={() => handleIconsNavigation('https://www.paypal.com/donate?hosted_button_id=G9HYJDHEKY2W2')} >
                <Entypo name="paypal" size={36} color="black" />
              </TouchableOpacity>
            </View>
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
  viewButtonBack:{
    position: 'relative',
    width: '10%'
  },
  buttonBack: {
  },
  iconBack:{
		fontSize: 42,
  },
  viewMain:{
		flex:1,
		width: '100%',
		
    padding: 10,
  },
  textAboutHeader:{
    textAlign: 'center',
    fontSize: 32,
    margin: 10
  },
  textAboutDeveloper:{
    textAlign: 'center',
    fontSize: 24,
    margin: 10
  },
  viewSocialIcons:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10
  },
  textAboutDescription:{
    margin: 10,
    fontSize: 22
  },
});