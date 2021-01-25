import './App.css';
import React from 'react';
import WallWrapper from './components/Wall/WallWrapper';
import {WallProvider} from './Contexts/WallContext';

function App() {
  
  
  return (
    <WallProvider>
      <WallWrapper/>
    </WallProvider>
  );
}

export default App;
