//Libraries
import './App.css';
import React, {useEffect, useState} from 'react';

//Components
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import Login from '../components/login/login'

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Login></Login>
      <Footer></Footer>
    </div>  
  );
}

export default App;
