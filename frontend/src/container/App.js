//Libraries
import './App.css';
import React, {useEffect, useState} from 'react';

//Components
import Routes from "../components/routes/index"
import {UidContext} from "../components/app.Context"

function App() {
  const [uid, setUid] = useState(null);

  return (
    <UidContext.Provider value={uid}>
      <div className="App">
        <Routes/>
      </div>
    </UidContext.Provider> 
  );
}

export default App;
