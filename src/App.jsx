import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/consuming-app/page/home-page/HomePage';
import {useWindowClass} from "./components/consuming-app/smart/window-class/WindowClass";

const App = () => {
  const [count, setCount] = useState(0);
  const windowClassData = useWindowClass();
  return (
      <HomePage windowClass={windowClassData.windowClass}/>
  );
};

export default App;
