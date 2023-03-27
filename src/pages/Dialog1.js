import React, { useEffect, useState } from "react";
import "./Dialog1.css";
import Switch from '@mui/material/Switch'
import Position from "rsuite/esm/Overlay/Position";

function Dialog1({pageX, pageY, dialogOK1, dialogC1, onBinsChange, onClass1Change, onD1heightChange, onCheckedChange }) {
  
  const [bins, setBins] = useState('1');
  const [class1, setClass1] = useState('Airplane');
  const [d1height, setD1height] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    onD1heightChange(d1height);
  }, [d1height, onD1heightChange]);

  useEffect(() => {
    onBinsChange(bins);
  }, [bins, onBinsChange]);

  useEffect(() => {
    onClass1Change(class1);
  }, [class1, onClass1Change])

  useEffect(() => {
    onCheckedChange(checked);
  }, [checked, onCheckedChange])
  

  const style = {
    position: 'fixed',
    top: pageX,
    left: pageY,
  }

  return (

    <div
      className="dialog-content"
      style={style}
    >
      <div>
        <h1>Enter the below inputs</h1>
        <div className="input-holder">
          <div className="input-holder-1">
            <label className="input-label">Select Class</label>
            <select className="input-box" value={class1} onChange={e => setClass1(e.target.value)} >
              <option value='Airplane' >Airplane</option>
              <option value='Helicopter' >Helicopter</option>
              <option value='Baloon' >Hot Air Baloon</option>
              <option value='Birds' >Birds</option>
            </select>
          </div>
          <div className="input-holder-1" >
            <label className="input-label" >Transmission Element</label>
            <Switch onChange={handleChange} />
          </div>
          {checked && (<div className="input-holder-1">
            <label className="input-label">Enter actual height</label>
            <input className="input-box" type="number" onChange={e => setD1height(e.target.value)} />
          </div>)}
          <div className="input-holder-1">
            <label className="input-label">select the orientation</label>
            <select className="input-box" value={bins} onChange={e => setBins(e.target.value)} >
                <option value='1' >0% - 25%</option>
                <option value='2' >26% - 50%</option>
                <option value='3' >51% - 75%</option>
                <option value='4' >76% - 100%</option>
            </select>
          </div>
        </div>
        <div className="btn-holder">
          <button className="btn-ok" onClick={() => dialogOK1(true)}>
            OK
          </button>
          <button className="btn-cancel" onClick={() => dialogC1(true)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog1;
