import React from "react"
import { useState } from "react"
import './model.css'

const Model=()=>{
    const [model,setModel]=useState(true);
    const toggleModel=()=>{
        setModel(!model)
    }
    if(model){
        document.body.classList.add('active-model')
    }
    else{
     document.body.classList.remove('active-model' )
    }
    
    return(
        <>
            <button
                onClick={toggleModel}
                className="btn-model">...</button>
                {model &&(
                
                    <div className="model">
                    <div 
                    onClick ={toggleModel} className="overlay"></div>
                    <div className="model-content">
                    <ol>
                  
                    <li><a href="">Truncation</a>
                    <label htmlFor=""></label>
                    <select name="" id="">
                      <option value=""></option>
                      <option value="">0%-25%</option>
                      <option value="">25%-50%</option>
                      <option value="">50%-75%</option>
                      <option value="">75%-100%</option>
                        </select>
                       </li>
                <li><a href="">Class</a>
                <select name="" id="">
                  <option value=""></option>
                <option value="">Aeroplane</option>
                        <option value="">Helicopter</option>
                        <option value="">Jet</option>
                        <option value="">Parachute</option>
                        <option value="">Birds</option>
                  </select>
                  </li>
                  <li><a href="">Sub-Class</a>
                  <select name="" id="">
                    <option value=""></option>
                    <option value="">Small-AP</option>
                    <option value="">Medium-AP-1</option>
                    <option value="">Medium-AP-2</option>
                    <option value="">Large-AP</option>
                    <option value="">Saiplane</option>
                    <option value="">Other Aircrafts</option>
                    
                  </select>
                  </li>
                <li><a href="">Orientation</a>
                <select name="" id="">
                <option value=""></option>
                        <option value="">Yaw</option>
                        <option value="">Pitch</option>
                        <option value="">Roll</option>
                </select> 
                </li>
                </ol>
                    <button className='close-model'
                    onClick ={toggleModel}>CLOSE
                    </button>
                    </div>
                </div>
                )}
        </>
    )
}
export default Model