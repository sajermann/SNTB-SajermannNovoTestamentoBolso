interface ConsoleProps {
  message: string;
  style?: string;
}

export default function Console(props: ConsoleProps): void {
  let style = '\x1b[32m%s\x1b[0m';
  if(props.style === 'error'){
    style = '\x1b[31m%s\x1b[0m';
  }
  const sizeCaracteresLine = 80
  const paddingSpace = 6;
  const caracter = '─'
  const header = () => {
    let result = '┌';
    for(let i = 0; i < sizeCaracteresLine; i++){
      result += caracter;
    }
    result += '┐';
    return result;
  }
  const footer = () => {
    let result = '└';
    for(let i = 0; i < sizeCaracteresLine; i++){
      result += caracter;
    }
    result += '┘';
    return result;
  }

  // Converte a mensagem em palavras
  const arrayWords = props.message.split('\n').join(' ').split(' ');

  // Cria um array que para cada posição representa uma linha do console
  const arrayPerLines = Array<string>();
  let line = '';

  // Enquanto hover palavras no arrayWords
  while(arrayWords.length > 0){
      // Se o tamanho da linha mais o tamanho do valor da primeira posição do 
      // arrayWords for menor que (Tamanho de caracteres por linha - (passingSpace * 2))
      if(line.length + arrayWords[0].length < (sizeCaracteresLine - (paddingSpace * 2))){
        if(arrayWords[0] !== ''){
          // Concatena o valor presente no line com um espaço e com o primeiro valor do arrayWords
          line = `${line} ${arrayWords[0]}`;
        }
        // Remove o primeiro valor do arrayWords, assim a lógica no loop não é prejudicada
        arrayWords.shift();
      }else {
        // Se não, adiciona o line dentro do arrayPerLines
        arrayPerLines.push(line);
        // Limpa o line para não interferir no próximo loop repetindo as palavras/linhas
        line = '';
      }

      if(arrayWords.length === 0 && line.length > 0){
        arrayPerLines.push(line);
        // Limpa o line para não interferir no próximo loop repetindo as palavras/linhas
        //line = '';
      }
    
  }
  console.log(style, header());
  console.log(style, `│${' '.repeat(sizeCaracteresLine)}│`);
  arrayPerLines.map(item=>console.log(style, `│${' '.repeat(paddingSpace)}${item}${' '.repeat(sizeCaracteresLine - item.length - paddingSpace)}│`));
  console.log(style, `│${' '.repeat(sizeCaracteresLine)}│`);
  console.log(style, footer());
}