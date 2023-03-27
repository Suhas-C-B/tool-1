import React from 'react';
import { useState, useEffect } from 'react';
import './canvas.css';

function Practice() {

    const [coord, setCoord] = useState([]);
    const [imgRefC, setImgRefC] = useState([]);
    const [elements, setElements] = useState([]);
    const [elements1, setElements1] = useState([]);
    const [elements2, setElements2] = useState([]);
    const [coord1, setCoord1] = useState([]);
    const [center, setCenter] = useState([]);
    const [height, setHeight] = useState();
    const [width, setWidth] = useState();
    const [height1, setHeight1] = useState();
    const [width1, setWidth1] = useState();
    const [visible, setVisible] = useState(false);
    const [draw, setDraw] = useState(false)


    const imgRefMove = (event) => {
        let imgRefC = [event.nativeEvent.offsetX, event.nativeEvent.offsetY]
        setImgRefC(imgRefC)
    }

    const handleMouseMove = (event) => {
        if (visible) {
            let coordinates = [event.nativeEvent.offsetX, event.nativeEvent.offsetY]
            setCoord(coordinates)
            let draw = true
            setDraw(draw)
        }
    }

    const handleMouseMove1 = (event) => {
        let coordinates1 = [event.nativeEvent.offsetX, event.nativeEvent.offsetY]
        setCoord1(coordinates1)
        let draw = false
        setDraw(draw)
    }

    const handleClick = index => {
        if (visible === false) {
            delete elements1[index]
            delete elements[index]
            delete elements2[index]
            console.log(index)
        }
    }

    const displayIndex = (e) => {
        console.log(e.target.getAttribute('key'))
    }

    const handleToggle = () => {
        setVisible((current) => !current);
    }


    useEffect(() => {
        if (draw === true){
            let h1 = imgRefC[1] - coord[1]
            let w1 = imgRefC[0] - coord[0]
            setHeight1(h1)
            setWidth1(w1)
        }
    })

    useEffect(() => {
        if (visible) {
            setElements([...elements, <rect x={coord[0] - 6} y={coord[1] - 6} width="12" height="12" fill="lightgreen" />])
        }
    }, [coord])

    useEffect(() => {
        if (visible) {
            let h = coord1[1] - coord[1]
            let w = coord1[0] - coord[0]
            let c1 = coord[0] + (w / 2)
            let c2 = coord[1] + (h / 2)
            setHeight(h)
            setWidth(w)
            setCenter([c1, c2])
            setElements2([...elements2, <rect x={coord1[0] - 6} y={coord1[1] - 6} width="12" height="12" fill="lightblue" />])
        }
    }, [coord1])



    useEffect(() => {
        if (visible) {
            setElements1([...elements1, <rect className='rectangle' x={coord[0]} y={coord[1]} width={width} height={height} />])
            console.log(coord1)
        }
    }, [center])

    return (
        <div className='main-div'>
            <div className='tool-div'>
                <button onClick={handleToggle}>Toggle Button</button>
            </div>
            <div className='canvas-div'>
                <svg style={{ height: '100vh', width: '100%' }} onMouseDown={(event) => handleMouseMove(event)} onMouseUp={(event) => handleMouseMove1(event)} onMouseMove={(event) => imgRefMove(event)} >
                    <image xlinkHref="./src/4.png" width="998" height='804' />
                    {draw && <foreignObject className='imgref' x={coord[0]} y={coord[1]} height={height1} width={width1}>
                        <div >
                        </div>
                    </foreignObject>}
                    {elements.map((element, index) => {
                        return (
                            <g key={index}>
                                {element}
                            </g>
                        )
                    })}
                    {elements2.map((element, index) => {
                        return (element && (
                            <g key={index}>
                                {element}
                            </g>
                        )
                        )
                    })}
                    {elements1.map((element, index) => {
                        return (
                            <g key={index} onClick={() => handleClick(index)}>
                                {element}
                            </g>
                        )
                    })}
                </svg>
            </div>
            <div className='label-div'>
                Label Bar
            </div>
        </div>
    )
}

export default Practice
