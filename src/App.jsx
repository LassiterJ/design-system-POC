import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/consuming-app/page/home-page/HomePage';
import { AppDataProvider } from './components/consuming-app/smart/app-data/AppData';

const App = () => {
  return (
    <AppDataProvider  >
      <HomePage />
    </AppDataProvider>
  );
};

export default App;
