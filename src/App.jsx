import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/consuming-app/page/home-page/HomePage';
import {WindowClassProvider} from "./components/consuming-app/smart/window-class/WindowClass";

const App = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  return (
    <WindowClassProvider >
      <HomePage />
    </WindowClassProvider>
  );
};

export default App;
