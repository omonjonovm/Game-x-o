import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import "./Tako.css";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const Tako = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggle = (e, num) => {
    if (lock) {
      return;
    }
    if (data[num] !== "") {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src=${cross} alt="X">`;
      data[num] = 'x';
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src=${circle} alt="O">`;
      data[num] = 'o';
      setCount(count + 1);
    }
    checkWin();
  };

  const resetGame = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    titleRef.current.innerHTML = 'X/0';
    box_array.forEach((box) => {
      box.current.innerHTML = "";
    });
  };

  const checkWin = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    Swal.fire({
      title: 'Congratulations!',
      text: `Player ${winner.toUpperCase()} has won!`,
      imageUrl: winner === 'x' ? cross : circle,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: winner === 'x' ? 'X' : 'O',
      animation: false
    }).then(() => {
      resetGame();
    });
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>X/0</h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
    </div>
  );
};

export default Tako;
