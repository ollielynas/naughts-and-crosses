import React from 'react';
import './App.css';
import { useState } from 'react';
import useCookie from "./useCookie";

let turn: number = 0;
function App() {

  let [matrix, setMatrix] = useState([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);

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

  let [start, setStart] = useState("Player starts");

  function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
// deleteAllCookies();


  let [tie, setTie]: any = useCookie("tieCookie", "0");
  let [bot, setBot]: any = useCookie("botCookie", "0");
  let [player, setPlayer]: any = useCookie("playerCookie", "0");



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

      checkWin();
      botTurn();
      checkWin();
    }
  }

  let winState: number[][][] = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[2, 0], [1, 1], [0, 2]]
  ];

  let checkWin = () => {
    let emptySpace: number = 0;  // cheack for win event
    let OSpace: number = 0;
    let XSpace: number = 0;

    if (
      matrix[0][0] === "O" &&
      matrix[0][1] === "O" &&
      matrix[0][2] === "O"&&
      matrix[1][0] === "O"
      && matrix[1][1] === "O"
      && matrix[1][2] === "O"
      && matrix[2][0] === "O"
      && matrix[2][1] === "O"
      && matrix[0][2] === "O") {setTie(parseInt(tie) + 1, 100); reset(); return;}

    for (var i = 0; i < winState.length; i++) {
      emptySpace = 0;
      OSpace = 0;
      XSpace = 0;
      for (var j = 0; j < 3; j++) {

        if (matrix[winState[i][j][0]][winState[i][j][1]] === "O") {
          OSpace++;
        } else if (matrix[winState[i][j][0]][winState[i][j][1]] === "X") {
          XSpace++;
        }
      } if (OSpace == 3) { console.log("win"); reset(); setBot(parseInt(bot) + 1, 100); return; }
      if (XSpace == 3) { console.log("win"); reset(); setPlayer(parseInt(player) + 1, 100); return; } // end cheack for win
    }



  }


  const sleep = (milliseconds: number) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


  const reset = () => {
    sleep(100);
    setMatrix([[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]);
    turn = 0;
    updateMatrix();
  }

  const botTurn = () => {
    let emptySpace: number = 0;
    let OSpace: number = 0;
    let XSpace: number = 0;
    turn++;
    console.log("turn 1: " + turn); //-------------- first turn ------------------------
    if (turn === 1) {
      console.log("first turn " + turn);
      if (matrix[1][1] === " ") {
        array[1][1] = "O"; setMatrix(array);
      } else { array[2][0] = "O"; setMatrix(array); }

    } else {
      // -----------------------cheack if the bot can win------------------------------
      for (var i = 0; i < winState.length; i++) {
        let emptySpace: number = 0;
        let OSpace: number = 0;
        let XSpace: number = 0;
        for (var j = 0; j < 3; j++) {

          if (matrix[winState[i][j][0]][winState[i][j][1]] === " ") {
            emptySpace++;
          }
          else if (matrix[winState[i][j][0]][winState[i][j][1]] === "O") {
            OSpace++;
          } else if (matrix[winState[i][j][0]][winState[i][j][1]] === "X") {
            XSpace++;
          }
          //console.log("test one "+winState[i][j]);
          //console.log("places: empty" + emptySpace+" O: "+OSpace+" O: "+XSpace);

          // --------------------- playing move --------------------------------------
          if (OSpace == 2 && emptySpace == 1) {

            console.log("space: " + winState[i][j])
            for (var k = 0; k < 3; k++) {
              if (matrix[winState[i][k][0]][winState[i][k][1]] === " ") {
                console.log("bot move: " + winState[i][k][0] + winState[i][k][1]);
                array[winState[i][k][0]][winState[i][k][1]] = "O";
                setMatrix(array);
                updateMatrix();
                return;
              }
            }
          }
        }
      } for (var i = 0; i < winState.length; i++) {
        let emptySpace: number = 0;
        let OSpace: number = 0;
        let XSpace: number = 0;
        for (var j = 0; j < 3; j++) {

          if (matrix[winState[i][j][0]][winState[i][j][1]] === " ") {
            emptySpace++;
          }
          else if (matrix[winState[i][j][0]][winState[i][j][1]] === "O") {
            OSpace++;
          } else if (matrix[winState[i][j][0]][winState[i][j][1]] === "X") {
            XSpace++;
          }
          //console.log("test one "+winState[i][j]);
          //console.log("places: empty" + emptySpace+" O: "+OSpace+" O: "+XSpace);

          if (XSpace == 2 && emptySpace == 1) {
            for (var k = 0; k < 3; k++) {
              console.log("space2: " + winState[i][j])
              if (matrix[winState[i][k][0]][winState[i][k][1]] === " ") {
                array[winState[i][k][0]][winState[i][k][1]] = "O";
                setMatrix(array);
                updateMatrix();
                return;
              }
            }
          }
        }
        if (OSpace == 3) { console.log("win"); reset(); }
        if (XSpace == 3) { console.log("win"); reset(); }
      }

      //----------------------------------------- custom move -------------------------------------------------

      if (matrix[0][0] === "X" && matrix[2][2] === "X" && matrix[1][1] === "O") {  
        array[2][1] = "O"; setMatrix(array); return
      }
      
      if (matrix[2][0] === "X" && matrix[0][2] === "X" && matrix[1][1] === "O") {  
        array[2][1] = "O"; setMatrix(array); return
      }

      if (matrix[2][1] === "X" && matrix[1][2] === "X" && matrix[1][1] === "O") {  
        array[2][2] = "O"; setMatrix(array); return
      }

      if (matrix[2][1] === "X" && matrix[1][0] === "X" && matrix[1][1] === "O") {  
        array[2][0] = "O"; setMatrix(array); return
      }

      if (matrix[2][1] === "X" && matrix[1][0] === "X" && matrix[1][1] === "O") {  
        array[2][0] = "O"; setMatrix(array); return
      }

      //----------------------------------------------------- secound thing -------------------------------------------------
      for (var i = 0; i < winState.length; i++) {
        let emptySpace: number = 0;
        let OSpace: number = 0;
        let XSpace: number = 0;
        for (var j = 0; j < 3; j++) {

          if (matrix[winState[i][j][0]][winState[i][j][1]] === " ") {
            emptySpace++;
          }
          else if (matrix[winState[i][j][0]][winState[i][j][1]] === "O") {
            OSpace++;
          } else if (matrix[winState[i][j][0]][winState[i][j][1]] === "X") {
            XSpace++;
          }
          //console.log("test one "+winState[i][j]);
          //console.log("places: empty" + emptySpace+" O: "+OSpace+" O: "+XSpace);

          // --------------------- playing move --------------------------------------
          if (OSpace == 1 && emptySpace == 2) {

            console.log("space: " + winState[i][j])
            for (var k = 0; k < 3; k++) {
              if (matrix[winState[i][k][0]][winState[i][k][1]] === " ") {
                console.log("bot move: " + winState[i][k][0] + winState[i][k][1]);
                array[winState[i][k][0]][winState[i][k][1]] = "O";
                setMatrix(array);
                updateMatrix();
                return;
              }
            }
          } else if (XSpace == 1 && emptySpace == 2) {
            for (var k = 0; k < 3; k++) {
              console.log("space2: " + winState[i][j])
              if (matrix[winState[i][k][0]][winState[i][k][1]] === " ") {
                array[winState[i][k][0]][winState[i][k][1]] = "O";
                setMatrix(array);
                updateMatrix();
                return;
              }
            }
          } else {

            console.log("defalt");
            if (matrix[1][1] == " ") { array[1][1] = "O"; setMatrix(array); return }
            else if (matrix[0][0] == " ") { array[0][0] = "O"; setMatrix(array); return }
            else if (matrix[0][2] == " ") { array[0][2] = "O"; setMatrix(array); return }
            else if (matrix[2][0] == " ") { array[2][0] = "O"; setMatrix(array); return }
            else if (matrix[2][2] == " ") { array[2][2] = "O"; setMatrix(array); return }
            else if (matrix[1][0] == " ") { array[1][0] = "O"; setMatrix(array); return }
            else if (matrix[1][2] == " ") { array[1][2] = "O"; setMatrix(array); return }
            else if (matrix[0][1] == " ") { array[0][1] = "O"; setMatrix(array); return }
            else if (matrix[2][1] == " ") { array[2][1] = "O"; setMatrix(array); return }
            else { setTie(parseInt(tie) + 1, 100); reset(); return; }
          }
        }

      }

    }


    for (var i = 0; i < winState.length; i++) {
      let emptySpace: number = 0;
      let OSpace: number = 0;
      let XSpace: number = 0;
      for (var j = 0; j < 3; j++) {

        if (matrix[winState[i][j][0]][winState[i][j][1]] === " ") {
          emptySpace++;
        }
        else if (matrix[winState[i][j][0]][winState[i][j][1]] === "O") {
          OSpace++;
        } else if (matrix[winState[i][j][0]][winState[i][j][1]] === "X") {
          XSpace++;
        }
      }
    }
    if (OSpace == 3) { console.log("win"); reset(); setBot(parseInt(bot) + 1, 100); return; }
    if (XSpace == 3) { console.log("win"); reset(); setPlayer(parseInt(player) + 1, 100); return; }
  }


  return (
    <div className="App">
      <div
        className="App-Body"
      >
        <div className="App-border"></div>
        <div className="App-row">
          <button className="App-button" onClick={() => { button(0, 0) }} ><p className="App-button-text">{matrix[0][0]}</p></button>
          <button className="App-button" onClick={() => { button(0, 1) }} ><p className="App-button-text">{matrix[0][1]}</p></button>
          <button className="App-button" onClick={() => { button(0, 2) }} ><p className="App-button-text">{matrix[0][2]}</p></button>
        </div>
        <div className="App-row">
          <button className="App-button" onClick={() => { button(1, 0) }} ><p className="App-button-text">{matrix[1][0]}</p></button>
          <button className="App-button" onClick={() => { button(1, 1) }} ><p className="App-button-text">{matrix[1][1]}</p></button>
          <button className="App-button" onClick={() => { button(1, 2) }} ><p className="App-button-text">{matrix[1][2]}</p></button>
        </div>
        <div className="App-row">
          <button className="App-button" onClick={() => { button(2, 0) }} ><p className="App-button-text">{matrix[2][0]}</p></button>
          <button className="App-button" onClick={() => { button(2, 1) }} ><p className="App-button-text">{matrix[2][1]}</p></button>
          <button className="App-button" onClick={() => { button(2, 2) }} ><p className="App-button-text">{matrix[2][2]}</p></button>
        </div>
      </div>
      <div className="App-score">
        <p className="App-score-text">{("bot: " + bot)}</p>
        <p className="App-score-text">{"player: " + player}</p>
        <p className="App-score-text">{"tie: " + tie}</p>
        <button className="App-score-text" onClick={()=>{reset(); botTurn();}}>bot start {'\u00A0'}|</button>
        <button className="App-score-text" onClick={()=>{reset();}}>reset</button>
      </div>
    </div>
  );
}

export default App;
