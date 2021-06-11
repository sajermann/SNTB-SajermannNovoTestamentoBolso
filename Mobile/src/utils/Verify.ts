import Biblia from "../models/Biblia";

export const verifyVerse = (item: string, verse: string ): boolean => {
  const numberVerse = [];

    //console.log('Tipo do verse: ', typeof(verse), verse);
    //console.log('Tipo do verse: ', verse);
  for(let i = 0; i < item.length; i++){
    if(!isNaN(parseInt(item.split('')[i]))){
      numberVerse.push(item.split('')[i])
    }
  }
  // console.log(numberVerse.join(''), verse)
  // console.log(typeof(numberVerse.join('')), typeof(verse))
  // console.log(numberVerse.join('') === String(verse))
  return parseInt(numberVerse.join('')) === parseInt(verse);

 
}



