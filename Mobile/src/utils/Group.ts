import Biblia from "../models/Biblia";

export const groupBook = (biblias: Biblia[]) => {
  const newArray  = Array<string>();

  for(let i = 0; i < biblias.length; i++){
    if(!newArray.includes(biblias[i].titulo)){
      newArray.push(biblias[i].titulo);
    }
  }

  return newArray;
}
export const groupChapter = (biblias: Biblia[], book: string) => {

  const newArray  = Array<number>();

  for(let i = 0; i < biblias.length; i++){
    
    if(biblias[i].titulo === book && !newArray.includes(biblias[i].capitulo)){
      
      newArray.push(biblias[i].capitulo)
    
    }

  }

  return newArray;

}
export const groupVerse = (biblias: Biblia[], book: string, chapter: string): Array<number> => {
  console.log(book, chapter)
  const newArray  = Array<number>();

  for(let i = 0; i < biblias.length; i++){
    
    if(biblias[i].titulo === book && biblias[i].capitulo === parseInt(chapter) && !newArray.includes(biblias[i].versiculo)){
      
      newArray.push(biblias[i].versiculo)
    
    }

  }

  return newArray;

}
export const groupContent = (biblias: Biblia[], book: string, chapter: string, verse: string): Array<string> => {
  //console.log(book, chapter)
  const newArray  = Array<string>();

  for(let i = 0; i < biblias.length; i++){
    
    if(biblias[i].titulo === book 
      && biblias[i].capitulo === parseInt(chapter) 
      // && biblias[i].versiculo === parseInt(verse) 
      // && !newArray.includes(biblias[i].descricao)
      ){
      
      newArray.push(`${biblias[i].versiculo} ${biblias[i].descricao}\n`)
    
    }

  }

  return newArray;

}


