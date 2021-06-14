GOTO EndComment1
echo off
cls
:EndComment1

ECHO "### Iniciando Serviços"
cd backend
start startBackendDevelopment.bat
cd ../mobile
start startMobileDevelopment.bat



