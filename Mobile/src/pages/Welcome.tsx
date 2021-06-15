import React, { useEffect, useState, useContext } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import Biblia from '../models/Biblia';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { groupBook } from '../utils/Group';
import { BibliaContext } from '../context/BibliaContext';

export function Welcome(){
  const navigation = useNavigation();
  const { biblias } = useContext(BibliaContext);
  const [bibliasFiltered, setBibliasFiltered] = useState<Biblia[]>();
  const [textFilter, setTextFilter] = useState('');
	function handleFavorites(){
		navigation.navigate('Favorites');
	}
	function handleNavigation(title: string){
    
		navigation.navigate('Chapter', {
      book: title
    });
	}

  function handleTextFilter(value: string){
    setTextFilter(value);
    if(value === '') handleFilter();
  }
	function handleFilter(){
    const valueSearch = textFilter.toLowerCase();
    const bibliasForFilter = [...biblias];
		const resultFiltred = bibliasForFilter.filter(item => {
      return (
        item.titulo.toLowerCase().indexOf(valueSearch) > -1 // ||
        // item.descricao.toLowerCase().indexOf(valueSearch) > -1 ||
        // item.capitulo.toString().indexOf(valueSearch) > -1 ||
        // item.versiculo.toString().indexOf(valueSearch) > -1
      )
    });

    if (resultFiltred) {
			setBibliasFiltered(resultFiltred);
    }

	}

  useEffect(()=>{
    if(biblias !== undefined){
      setBibliasFiltered(biblias);
    }
    
  },[biblias]);

  if(!bibliasFiltered){
    return <Text style={styles.loading}>Carregando</Text>
  }

	return(
    <SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
        <View style={styles.viewHeader}>
          <View style={styles.viewFilter}>
            <TextInput
              style={styles.inputSearch} 
              placeholder="Pesquisar"
              // onBlur={handleInputBlur}
              // onFocus={handleInputFocus}
              value={textFilter}
              onChangeText={(value)=>handleTextFilter(value)}
            />
            <TouchableOpacity style={styles.buttonSearch} activeOpacity={0.7} onPress={handleFilter} >
              <Feather name="search" style={styles.iconSearch} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.viewTextBooks}>
            <Text style={styles.textTextBooks}>Livros</Text>
          </View>
        </View>
				<View style={styles.viewMain}>
          {
            bibliasFiltered.length === 0 &&
            <Text style={styles.noResultFilter}>Sem resultados!</Text>
          }
          <FlatList
            data={groupBook(bibliasFiltered)}
            keyExtractor={(item)=>String(item)}
            renderItem={({item})=>(
              <TouchableOpacity style={styles.buttonCard} activeOpacity={0.7} onPress={()=>handleNavigation(item)} >
                <Text numberOfLines={1} style={styles.textCard}>
                  {item}
                </Text>
                <Feather name="arrow-right" style={styles.iconEnter} /> 
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={true}
          />
        </View>
        {/* <View style={styles.viewFooter}>
					<TouchableOpacity style={styles.buttonFavorite} activeOpacity={0.7} onPress={handleFavorites} >
            <Feather name="star" style={styles.iconFavorite} />
						<Text style={styles.textFavorite}>
              Favoritos
						</Text>
					</TouchableOpacity>
        </View> */}
			</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loading:{
    fontSize:48
  },

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewFilter:{
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
  viewTextBooks:{
    marginTop: 10
  },
  textTextBooks:{
    fontSize: 32,
  },
  viewMain:{
		flex:1,
		width: '100%',
		justifyContent: 'center',
    padding: 10,
  },
  noResultFilter:{
    fontSize:48
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
    padding: 5, 
    overflow: 'hidden'
  },
  textCard:{
    fontSize: 42,
    color: 'red',
    width: '80%',
    overflow: 'hidden',
    flex: 1,
    textAlign: "left" 
  },
  iconEnter:{
    color: 'black',
    fontSize: 42,
    width: '10%'
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
});