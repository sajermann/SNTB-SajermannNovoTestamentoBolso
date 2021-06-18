import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/lottie-angel.json';
import { Text } from 'react-native';

export function Load(){

	return(
    <View style={styles.container}>
			<LottieView 
				source={loadAnimation}			
				autoPlay
				loop
				style={styles.animation}
			/>
      <View style={styles.viewTextLoading}>
        <Text style={styles.textLoading}>Carregando</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
  },
	animation:{
		backgroundColor: '#fff',
		width: '100%',
		height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
	},
  viewTextLoading:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  textLoading:{
    fontSize: 36
  }

})