import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {

  let [matrix, setMatrix] = useState([[" "," "," "],[" "," "," "],[" "," "," "]]);

  //for some reason this is needed to update the text in the buttons
  let [matrix00, setMatrix00] = useState(" ");
  let [matrix01, setMatrix10] = useState(" ");
  let [matrix02, setMatrix20] = useState(" ");
  let [matrix10, setMatrix01] = useState(" ");
  let [matrix11, setMatrix11] = useState(" ");
  let [matrix12, setMatrix21] = useState(" ");
  let [matrix20, setMatrix02] = useState(" ");
  let [matrix21, setMatrix12] = useState(" ");
  let [matrix22, setMatrix22] = useState(" ");

  const updateMatrix = () => { // idk why this is nessary
      setMatrix00(matrix[0][0]);
      setMatrix01(matrix[0][1]);
      setMatrix02(matrix[0][2]);
      setMatrix10(matrix[1][0]);
      setMatrix11(matrix[1][1]);
      setMatrix12(matrix[1][2]);
      setMatrix20(matrix[2][0]);
      setMatrix21(matrix[2][1]);
      setMatrix22(matrix[2][2]);
  }
let array: string[][] = matrix;
  const button = (y: number, x: number) => {
    if (matrix[y][x] === " ") {
      
      array[y][x] = "X";
      setMatrix(array)
      updateMatrix();
      bottTurn();
    }
  }
  let firstTurn: boolean = true;

  const bottTurn = () => {
    if (firstTurn) {
      firstTurn = false;
      if (matrix[1][1]===" ") {array[1][1] = "O"; setMatrix(array);
    }else{array[2][0] = "O"; setMatrix(array);}

    }else{
      // -----------------------cheack if the bot can win------------------------------
      for (let i: number = 0; i < 3; i++) {
        if (matrix[i][0] == "O" && matrix[i][2] == "O" && matrix[i][1] == " ") {array[i][1] = "O"; setMatrix(array)}
      }
      for (let i: number = 0; i < 3; i++) {
        if (matrix[i][1] == "O" && matrix[i][2] == "O") {array[i][0] = "O"; setMatrix(array)}
      }
      for (let i: number = 0; i < 3; i++) {
        if (matrix[i][1] == "O" && matrix[i][0] == "O") {array[i][1] = "O"; setMatrix(array)}
      }

    }
  }


  return (
    <div className="App">
      <div
      className="App-Body"
      >
        <div className="App-border"></div>
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(0,0)}} ><p className="App-button-text">{matrix[0][0]}</p></button>
        <button className="App-button" onClick={()=>{button(0,1)}} ><p className="App-button-text">{matrix[0][1]}</p></button>
        <button className="App-button" onClick={()=>{button(0,2)}} ><p className="App-button-text">{matrix[0][2]}</p></button>
      </div>
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(1,0)}} ><p className="App-button-text">{matrix[1][0]}</p></button>
        <button className="App-button" onClick={()=>{button(1,1)}} ><p className="App-button-text">{matrix[1][1]}</p></button>
        <button className="App-button" onClick={()=>{button(1,2)}} ><p className="App-button-text">{matrix[1][2]}</p></button>
      </div>
      <div className="App-row">
        <button className="App-button" onClick={()=>{button(2,0)}} ><p className="App-button-text">{matrix[2][0]}</p></button>
        <button className="App-button" onClick={()=>{button(2,1)}} ><p className="App-button-text">{matrix[2][1]}</p></button>
        <button className="App-button" onClick={()=>{button(2,2)}} ><p className="App-button-text">{matrix[2][2]}</p></button>
      </div>
      </div>
    </div>
  );
}

export default App;
