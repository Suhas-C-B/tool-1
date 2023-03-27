import React from "react";
import { useState, useEffect } from "react";
import "./canvas.css";
import Dialog from "./Dialog";
import Dialog1 from "./Dialog1";
import Model from "./Model";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import srcimg from "c:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/some_image.jpg";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { IconContext } from "react-icons";
import { RxTransform, RxPencil1 } from "react-icons/rx";
import { GrTrash, GrBladesVertical } from "react-icons/gr";
import AppSelectIcon from "@rsuite/icons/AppSelect";
import { Button } from "rsuite";
import { Tooltip } from "@mui/material";
import DropDown from "C:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/components/dropdown.jsx";
import "./Dialog1.css";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.05)"
      : "rgba(0, 0, 0, 0.3)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(12),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function Canvas() {
  const [coord, setCoord] = useState([]);
  const [imgRefC, setImgRefC] = useState([]);
  const [d1coordx, setD1coordx] = useState();
  const [d1coordy, setD1coordy] = useState();
  const [elements, setElements] = useState([]);
  const [elements1, setElements1] = useState([]);
  const [elements2, setElements2] = useState([]);
  const [elements3, setElements3] = useState([]);
  const [coord1, setCoord1] = useState([]);
  const [coord2, setCoord2] = useState([]);
  const [center, setCenter] = useState([]);
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [height1, setHeight1] = useState();
  const [width1, setWidth1] = useState();
  const [visible, setVisible] = useState(false);
  const [draw, setDraw] = useState(false);
  const [edit, setEdit] = useState(false);
  const [del, setDel] = useState(false);
  const [delIndex, setDelIndex] = useState();
  const [delIndex1, setDelIndex1] = useState();
  const [dialog1, setDialog1] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [index1, setIndex1] = useState();
  const [btnClr, setBtnClr] = useState(false);
  const [expanded, setExpanded] = useState();
  const [class2, setClass2] = useState("");
  const [bins1, setBins1] = useState("");
  const [d1height1, setD1height1] = useState();
  const [checked1, setChecked1] = useState();
  const [data4, setData4] = useState([]);

  const [drawBtnClr, setDrawBtnClr] = useState({
    backgroundColor: "#FFC596",
  });
  const [editBtnClr, setEditBtnClr] = useState({
    backgroundColor: "#FFC596",
  });
  const [delBtnClr, setDelBtnClr] = useState({
    backgroundColor: "#FFC596",
  });
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  var data3 = [];

  elements1.forEach((element) => {
    if (element != null && element !== undefined && element !== "") {
      data3.push(element);
    }
  });


  var listItems1 = data3.map((data31, index) => (
    [data31.props.height, data31.props.width, data31.props.x, data31.props.y]
  ));

  var listItems = listItems1.map((data31, index) => (
    <Accordion
      expanded={index === expanded}
      onChange={() => handleChange({ index })}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{index}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ul>
            <li style={{ listStyleType: "none" }}>
              Height: {data31[0]}{" "}
            </li>
            <li style={{ listStyleType: "none" }}>
              Width: {data31[1]}{" "}
            </li>
            <li style={{ listStyleType: "none" }}>
              Position X: {data31[2]}{" "}
            </li>
            <li style={{ listStyleType: "none" }}>
              Position Y: {data31[3]}{" "}
            </li>
            <li style={{ listStyleType: "none" }} >
              Class: {data31[4]}
            </li>
            <li style={{ listStyleType: "none" }} >
              Actual height: {data31[5]}
            </li>
            <li style={{ listStyleType: "none" }} >
              Orientation: {data31[6]}
            </li>
            <li style={{ listStyleType: "none" }} >
              Transition element: {data31[7]}
            </li>
          </ul>
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));

  const handleChange = (hi) => {
    if (hi.index === expanded) {
      setExpanded();
    } else {
      setExpanded(hi.index);
    }
  };

  const handleBinsChange = (value) => {
    setBins1(value);
  };

  const handleD1heightChange = (value) => {
    setD1height1(value);
  };

  const handleD1CheckedChange = (value) => {
    setChecked1(value)
  }

  function handleClass1Change(value) {
    setClass2(value);
  }

  const handleDialog1OK = (choose) => {
    if (draw) {
      if (choose) {
        setIsOpen(false);
        setData4([class2, bins1, d1height1, checked1])
        console.log(bins1);
        console.log(class2);
        console.log(d1height1);
        console.log(checked1);
      }
    }
  };

  const handleDialog1C = (choose) => {
    if (choose) {
      setIsOpen(false);
      elements.pop();
      elements1.pop();
      elements2.pop();
    }
  };

  const handleDelete1 = (choose) => {
    if (choose === true) {
      setDialog({
        message: "",
        isLoading: false,
      });
      setDialog1(true);
      setDelIndex1(delIndex);
    } else if (choose === false) {
      setDialog({
        message: "",
        isLoading: false,
      });
      setDialog1(false);
    }
  };

  const areUSureDelete = (type) => {};

  //const gElement = document.getElementsByTagName("g")[0];

  //gElement.addEventListener('click', function(event){
  //    console.log(this.getAttribute('key'))
  //})

  const handleMouseMove = (event) => {
    setImgRefC([event.nativeEvent.offsetX, event.nativeEvent.offsetY]);
  };

  const handleMouseDown = (event) => {
    if (draw) {
      let coordinates = [event.nativeEvent.offsetX, event.nativeEvent.offsetY];
      setCoord(coordinates);
      setDraw(true);
      setVisible(true);
      let d1coordinates = [event.offsetX, event.offsetY];
      setD1coordx(d1coordinates[0]);
      setD1coordy(d1coordinates[1]);
    }
  };

  const handleMouseUp = (event) => {
    if (draw) {
      if (
        coord[0] < event.nativeEvent.offsetX &&
        coord[1] < event.nativeEvent.offsetY
      ) {
        let coordinates1 = [
          event.nativeEvent.offsetX,
          event.nativeEvent.offsetY,
        ];
        setCoord1(coordinates1);
      } else if (
        coord[0] > event.nativeEvent.offsetX &&
        coord[1] > event.nativeEvent.offsetY
      ) {
        let coordinates1 = [coord[0], coord[1]];
        setCoord1(coordinates1);
        setCoord([event.nativeEvent.offsetX, event.nativeEvent.offsetY]);
      } else if (coord[0] > event.nativeEvent.offsetX) {
        setCoord1([coord[0], event.nativeEvent.offsetY]);
        setCoord([event.nativeEvent.offsetX, coord[1]]);
      } else if (coord[1] > event.nativeEvent.offsetY) {
        setCoord1([event.nativeEvent.offsetX, coord[1]]);
        setCoord([coord[0], event.nativeEvent.offsetY]);
      }
      setIsOpen(true);
    }
    setVisible(false);
    setHeight1(null);
    setWidth1(null);
  };

  const handleDraw = () => {
    setDraw((current) => !current);
    setBtnClr((current) => !current);
    setEdit(false);
    setDel(false);
  };

  const handleEdit = () => {
    setEdit((current) => !current);
    setBtnClr((current) => !current);
    setDraw(false);
    setDel(false);
  };

  const handleDelete = () => {
    setDel((current) => !current);
    setBtnClr((current) => !current);
    setDraw(false);
    setEdit(false);
  };

  const handleMouseDown1 = (index) => {
    if (edit) {
      console.log(index);
    }
  };

  const handleMouseDown2 = (index) => {
    if (edit) {
      console.log(elements2.index.props.x);
    }
    if (del) {
      setDialog({
        message: "Are you sure you want to" + { index } + " delete?",
        isLoading: true,
      });
      setDelIndex(index);
    }
  };

  const handleMouseDown3 = (props) => {
    if (edit) {
      console.log(elements2[index1].props.x);
    }
  };

  const handleData = () => {
    console.log(data4)
    console.log(listItems1);
    console.log(elements1);
    console.log(expanded);
  };

  const handleData1 = (index) => {
    if (edit) {
      setIndex1(index);
    }
  };

  useEffect(() => {
    if (dialog1) {
      delete elements[delIndex];
      delete elements1[delIndex];
      delete elements2[delIndex];
    }
  }, [delIndex1]);

  useEffect(() => {
    if (visible === true) {
      if (imgRefC[1] > coord[1] && imgRefC[0] > coord[0]) {
        let h1 = imgRefC[1] - coord[1];
        let w1 = imgRefC[0] - coord[0];
        setCoord2([coord[0], coord[1]]);
        setHeight1(h1);
        setWidth1(w1);
      } else if (imgRefC[1] < coord[1] && imgRefC[0] < coord[0]) {
        let h1 = coord[1] - imgRefC[1];
        let w1 = coord[0] - imgRefC[0];
        setCoord2([imgRefC[0], imgRefC[1]]);
        setHeight1(h1);
        setWidth1(w1);
      } else if (imgRefC[1] < coord[1] && imgRefC[0] > coord[0]) {
        let h1 = coord[1] - imgRefC[1];
        let w1 = imgRefC[0] - coord[0];
        setCoord2([coord[0], imgRefC[1]]);
        setHeight1(h1);
        setWidth1(w1);
      } else if (imgRefC[0] < coord[0] && imgRefC[1] > coord[1]) {
        let h1 = imgRefC[1] - coord[1];
        let w1 = coord[0] - imgRefC[0];
        setCoord2([imgRefC[0], coord[1]]);
        setHeight1(h1);
        setWidth1(w1);
      }
    }
  }, [imgRefC]);

  useEffect(() => {
    if (draw) {
      setElements1([
        ...elements1,
        <rect
          className="rectangle"
          x={coord[0]}
          y={coord[1]}
          width={width}
          height={height}
        />,
      ]);
      setElements2([
        ...elements2,
        <rect
          x={coord1[0] - 6}
          y={coord1[1] - 6}
          width="12"
          height="12"
          fill="lightblue"
        />,
      ]);
    }
  }, [center]);

  useEffect(() => {
    if (draw) {
      let h = coord1[1] - coord[1];
      let w = coord1[0] - coord[0];
      let c1 = coord[0] + w / 2;
      let c2 = coord[1] + h / 2;
      setHeight(h);
      setWidth(w);
      setCenter([c1, c2]);
    }
  }, [coord1]);

  useEffect(() => {
    if (draw) {
      setElements([
        ...elements,
        <rect
          x={coord[0] - 6}
          y={coord[1] - 6}
          width="12"
          height="12"
          fill="lightgreen"
        />,
      ]);
    }
  }, [coord1]);

  useEffect(() => {
    if (draw) {
      setDrawBtnClr({
        backgroundColor: "#B1F9F9",
      });
      setDelBtnClr({
        backgroundColor: "#FFC596",
      });
      setEditBtnClr({
        backgroundColor: "#FFC596",
      });
    } else if (edit) {
      setDrawBtnClr({
        backgroundColor: "#FFC596",
      });
      setDelBtnClr({
        backgroundColor: "#FFC596",
      });
      setEditBtnClr({
        backgroundColor: "#B1F9F9",
      });
    } else if (del) {
      setDrawBtnClr({
        backgroundColor: "#FFC596",
      });
      setDelBtnClr({
        backgroundColor: "#B1F9F9",
      });
      setEditBtnClr({
        backgroundColor: "#FFC596",
      });
    } else {
      setDrawBtnClr({
        backgroundColor: "#FFC596",
      });
      setDelBtnClr({
        backgroundColor: "#FFC596",
      });
      setEditBtnClr({
        backgroundColor: "#FFC596",
      });
    }
  }, [btnClr]);

  return (
    <div className="main-div">
      <div className="header">
        <p>Annotation Tool</p>
      </div>
      <div className="setion-container">
        <div className="tool-div">
          <IconContext.Provider value={{ size: "35px" }}>
            <Tooltip title="Click to activate Draw mode" placement="right">
              <button
                onClick={handleDraw}
                className="tool-button"
                style={drawBtnClr}
              >
                <RxTransform />
              </button>
            </Tooltip>
            <Tooltip title="Click to activate edit mode" placement="right">
              <button
                onClick={handleEdit}
                className="tool-button"
                style={editBtnClr}
              >
                <RxPencil1 />
              </button>
            </Tooltip>
            <Tooltip title="Click to activate delete mode" placement="right">
              <button
                onClick={handleDelete}
                className="tool-button"
                style={delBtnClr}
              >
                <GrTrash />
              </button>
            </Tooltip>
            <button onClick={handleData} className="tool-button">
              <GrBladesVertical />
            </button>
          </IconContext.Provider>
        </div>
        <div className="canvas-div">
          {dialog.isLoading && (
            <Dialog message={dialog.message} onDialog={handleDelete1} />
          )}
          {isOpen && (
            <Dialog1
              dialogC1={handleDialog1C}
              dialogOK1={handleDialog1OK}
              onBinsChange={handleBinsChange}
              onClass1Change={handleClass1Change}
              onD1heightChange={handleD1heightChange}
              onCheckedChange={handleD1CheckedChange}
            />
          )}
          <svg
            onMouseDown={(event) => handleMouseDown(event)}
            onMouseUp={(event) => handleMouseUp(event)}
            onMouseMove={(event) => handleMouseMove(event)}
            className="svg-container"
          >
            <foreignObject
              width="1028"
              height="274"
              style={{ pointerEvents: "none" }}
            >
              <img
                className="canvas-image"
                src={srcimg}
                width="1028"
                height="274"
                style={{ pointerEvents: "none" }}
              />
            </foreignObject>
            {visible && (
              <foreignObject
                className="imgref"
                x={coord2[0]}
                y={coord2[1]}
                height={height1}
                width={width1}
                style={{ pointerEvents: "none" }}
              >
                <div style={{ pointerEvents: "none" }}></div>
              </foreignObject>
            )}
            {elements.map((element, index) => {
              return (
                <g key={index} onMouseDown={() => handleMouseDown1(index)}>
                  {element}
                </g>
              );
            })}
            {elements1.map((element, index) => {
              return (
                <g key={index} onMouseDown={() => handleMouseDown2(index)}>
                  {element}
                </g>
              );
            })}
            {elements2.map((element, index) => {
              return (
                <g
                  key={index}
                  onMouseDown={() => handleData1(index)}
                  onMouseUp={handleMouseDown3}
                >
                  {element}
                </g>
              );
            })}
          </svg>
        </div>
        <div
          className="label-div"
          style={{ selectionColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="label-div1">
            Label List
            <ul>{listItems}</ul>
          </div>
          <div className="label-div2">Image List</div>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
