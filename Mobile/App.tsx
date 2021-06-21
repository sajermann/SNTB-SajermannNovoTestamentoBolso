import React from 'react';
import Routes from './src/routes';
import { BibliaProvider } from './src/context/BibliaContext'

export default function App() {
  return (
    <BibliaProvider>
      <Routes />
    </BibliaProvider>
  );
}