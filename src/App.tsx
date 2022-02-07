import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  let [matrix, setMatrix] = useState([[" "," "," "],[" "," "," "],[" "," "," "]]);

  const button = (y: number, x: number) => {
    console.log(y, x);
    if (matrix[y][x] === " ") {
      let array: string[][] = matrix;
      array[y][x] = "X";
      setMatrix(array)
      console.log(matrix);
    }
  }


  return (
    <div className="App">
      <div
      className="App-Body"
      >
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(0,0)}} >{matrix[0][0]}</button>
        <button className="App-button" onClick={()=>{button(0,1)}} >{matrix[0][1]}</button>
        <button className="App-button" onClick={()=>{button(0,2)}} >{matrix[0][2]}</button>
      </div>
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(1,0)}} >{matrix[1][0]}</button>
        <button className="App-button" onClick={()=>{button(1,1)}} >{matrix[1][1]}</button>
        <button className="App-button" onClick={()=>{button(1,2)}} >{matrix[1][2]}</button>
      </div>
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(2,0)}} >{matrix[2][0]}</button>
        <button className="App-button" onClick={()=>{button(2,1)}} >{matrix[2][1]}</button>
        <button className="App-button" onClick={()=>{button(2,2)}} >{matrix[2][2]}</button>
      </div>
      </div>
    </div>
  );
}

export default App;
