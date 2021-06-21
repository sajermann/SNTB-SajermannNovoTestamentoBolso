GOTO EndComment1
echo off
cls
:EndComment1

ECHO "### Executando o Sonar"


::Chave para executar o Sonar já cadastrado, caso não tenha o sonar, instale o docker, pesquise por instalar o sonar no docker, depois que estiver
::funcionando acesse o localhost na porta 9000, cadastre a senha do adm, add um novo projeto, pegue a chave e cole abaixo após a palavra call, não se
::esqueça de fazer o download do Sonar Scanner, coloque em qualquer lugar a pasta e insira uma nova variável de ambiente (PATH) setando para a pasta bin 
::do local de instalação do sonar scanner.
call sonar-scanner.bat -D"sonar.projectKey=tttttt" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=61fe78c9f86e3abf6703b95039af6ac377e4bef5"

