import React from 'react';

import Tabs from './component/tabs/Tabs';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div className="App-header-container">
          <Tabs value={2}/>
        </div>
      </div>
    </div>
  );
}

export default App;
