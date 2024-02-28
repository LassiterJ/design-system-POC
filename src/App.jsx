import React, { StrictMode, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HomePage } from './components/consuming-app/page/home-page/HomePage';
import { AppStateProvider } from './components/consuming-app/smart/app-state/AppStateProvider';
import LayoutComponentTestPage from './components/consuming-app/page/layout-component-test-page/LayoutComponentTestPage';
import Box from './components/consuming-app/layout/box/Box.jsx';

const App = () => {
  const [example, setExample] = useState('basic');

  return (
    <StrictMode>
      <AppStateProvider>
        <Box position="absolute" bottom="4" end="0" p="4" height="4" style={{ zIndex: 100 }}>
          <select onChange={(e) => setExample(e.target.value)}>
            <option value="basic">Basic</option>
            <option value="windowClassCSS">Window Class Intro</option>
            <option value="windowClassWithOriginalExample">Window Class With Basic Example</option>
            <option value="windowClassHero">HomePage Mockup</option>
          </select>
        </Box>
        <LayoutComponentTestPage example={example} />
      </AppStateProvider>
    </StrictMode>
  );
};

export default App;
