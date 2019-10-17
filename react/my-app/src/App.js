import React from 'react';
import logo from './logo.svg';
import './App.css';
import Demo1 from './component/demo1'
import Demo2 from './component/demo2'
import Demo3 from './component/demo3'
import Demo4 from './component/demo4'
import Toggle from './component/togglebtn'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Demo1 title='app引用' title1="bbbbbbbbbbbbbbb" />
        <Demo2 name="abc" />
        <Demo3 />
        <Demo4 />
        <Toggle />
      </header>
    </div>
  );
}

export default App;
