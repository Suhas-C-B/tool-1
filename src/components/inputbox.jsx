import React, { useEffect, useState } from "react";
import Switch from '@mui/material/Switch'
import './inputbox.css';

function Inputbox() {

    const [indexValue, setIndexValue] = useState('hello');
    const [class1, setClass1] = useState('Airplane');
    const [height1, setHeight1] = useState(0);
    const [yaw, setYaw] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [roll, setRoll] = useState(1);
    const [elements, setElements] = useState([]);

    const [finalData, setFinalData] = useState({
        'Class' : class1,
        'actualHeight' : height1,
        'Yaw': yaw,
        'Pitch': pitch,
        'Roll': roll
    })

    const handleChangeRoll = (value) => {
        setRoll(value)
        setFinalData({
            'Class' : class1,
            'actualHeight' : height1,
            'Yaw': yaw,
            'Pitch': pitch,
            'Roll': value
        })
        console.log(finalData["Actual Height"])
    }

    const handleChangeClass = (value) => {
        setClass1(value)
        setFinalData({
            'Class' : value,
            'actualHeight' : height1,
            'Yaw': yaw,
            'Pitch': pitch,
            'Roll': roll
        })
    }

    const handleChangeYaw = (value) => {
        setYaw(value)
        setFinalData({
            'Class' : class1,
            'actualHeight' : height1,
            'Yaw': value,
            'Pitch': pitch,
            'Roll': roll
        })
    }

    const handleChangePitch = (value) => {
        setPitch(value)
        setFinalData({
            'Class' : class1,
            'actualHeight' : height1,
            'Yaw': yaw,
            'Pitch': value,
            'Roll': roll
        })
    }

    const handleChangeHeight = (value) => {
        setHeight1(value)
        setFinalData({
            'Class' : class1,
            'actualHeight' : value,
            'Yaw': yaw,
            'Pitch': pitch,
            'Roll': roll
        })
    }

    const handleClick = () => {
        setElements([...elements, finalData])
        console.log(elements)
    }

    var listItems = elements.map((data, index) => (
        <ul key={index}>
            <li>{data.Class}</li>
            <li>{data.actualHeight}</li>
            <li>{data.Yaw}</li>
            <li>{data.Pitch}</li>
        </ul>
    ))

  return (
    <div className="main-div-ip" >
      <div className="container-div-ip" >
        <div className="input-container-ip">
        <label>Class</label>
        <select className="input-box-ip" onChange={e => handleChangeClass(e.target.value)} >
            <option>Airplane</option>
            <option>Helicopter</option>
            <option>Hot Air Baloon</option>
            <option>Bird</option>
        </select>
        </div>
        <div className="input-container-ip" >
            <label>Non Transmission elements</label>
            <Switch />
        </div>
        <div className="input-container-ip" >
            <label>Actual Height</label>
            <input type='number' className="input-box-ip" onChange={e => handleChangeHeight(e.target.value)} ></input>
        </div>
        <div className="input-container-ip" >
            <label>Yaw</label>
            <select className="input-box-ip" onChange={e => handleChangeYaw(e.target.value)} >
                <option value={1} >0% - 25%</option>
                <option value={2} >26% - 50%</option>
                <option value={3} >51% - 75%</option>
                <option value={4} >76% - 100%</option>
            </select>
        </div>
        <div className="input-container-ip" >
            <label>Pitch</label>
            <select className="input-box-ip" onChange={e => handleChangePitch(e.target.value)} >
                <option value={1} >0% - 25%</option>
                <option value={2} >26% - 50%</option>
                <option value={3} >51% - 75%</option>
                <option value={4} >76% - 100%</option>
            </select>
        </div>
        <div className="input-container-ip" >
            <label>Roll</label>
            <select className="input-box-ip" onChange={e => handleChangeRoll(e.target.value)} >
                <option value={1} >0% - 25%</option>
                <option value={2} >26% - 50%</option>
                <option value={3} >51% - 75%</option>
                <option value={4} >76% - 100%</option>
            </select>
            <button onClick={handleClick} >Click Me</button>
        </div>
      </div>
      <div>
        <div>
            {roll}
        </div>
        <div>{indexValue}</div>
        <div>{finalData.Class}</div>
        <div>{finalData.Yaw}</div>
        <div>{finalData.Pitch}</div>
        <div>{finalData.Roll}</div>
      </div>
        <div>
            <ul>
                <li>{listItems}</li>
            </ul>
        </div>
    </div>
  );
}

export default Inputbox;
