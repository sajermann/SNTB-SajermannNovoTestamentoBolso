GOTO EndComment1
echo off
cls
:EndComment1

ECHO "### Iniciando Servidor Backend"
call code . 
call cd PocketNewTestament.API
call dotnet watch run

