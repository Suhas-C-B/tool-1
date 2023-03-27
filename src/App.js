import './App.css';
import axios from "axios";
import { useState, useEffect } from "react";
import srcImg from './example.png';

function App() {
  const [coord, setCoord] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err, "it has an error"));
  });

  const handleMouseMove = (event) => {
    let coordnates = [event.clientX, event.clientY]
    setCoord(coordnates)
  }

  return (
    <div className="App">
      <h1>Image uploading react</h1>
      {
        data.map((singleData) => {
          const base64String = btoa(new Uint8Array(singleData.img.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte);
          }, "")
          );
          return <img src={`data:image/png;base64,${base64String}`} alt="" width="800" height='300' onMouseMove={(event) => handleMouseMove(event)} />
        })
      }
      <div style={{ backgroundImage: `url(${srcImg})` }}>
        <svg>
          <foreignObject x={coord[0]} y={coord[1]} height="100" width="100">
            <h2>X: {coord[0]}</h2>
            <h2>Y: {coord[1]}</h2>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export default App;

