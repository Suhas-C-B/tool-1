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
import srcimg from "c:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/USNavy-MQ-25_F-35_Refueling_wF-18-F.jpg";
import imgSource from "c:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/USNavy-MQ-25_F-35_Refueling_wF-18-F.jpg";
import Logo from "C:/Users/ASPLUSER/Desktop/React/annotation-tool/annotation-tool/src/pages/ARCTICTERN-LOGO.png";
import CropFreeIcon from "@mui/icons-material/CropFree";
import { AiOutlineDelete } from "react-icons/ai";
import { GrSelect } from "react-icons/gr";
import { IconContext } from "react-icons";
import { FaDrawPolygon } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineCloud } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
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
      ? "rgba(44, 83, 100, 1)"
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

function Canvas1() {
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
  const [sel, setSel] = useState(false);
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
  const [fileList, setFileList] = useState([]);
  const [droppedFile, setDroppedFile] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgSource1, setImgSource1] = useState("");
  const [edit1, setEdit1] = useState(false);
  const [editData, setEditData] = useState([]);
  const [editCoord, setEditCoord] = useState([]);
  const [editImgRef, setEditImgRef] = useState([]);
  const [edit2, setEdit2] = useState(false);
  const [editData2, setEditData2] = useState([]);
  const [editCoord2, setEditCoord2] = useState([]);
  const [edit3, setEdit3] = useState(false);
  const [editCoord3, setEditCoord3] = useState([]);
  const [editData3, setEditData3] = useState([]);

  const [drawBtnClr, setDrawBtnClr] = useState({
    color: "#FFC596",
  });
  const [editBtnClr, setEditBtnClr] = useState({
    color: "#FFC596",
  });
  const [delBtnClr, setDelBtnClr] = useState({
    color: "#FFC596",
  });
  const [selBtnClr, setSelBtnClr] = useState({
    color: "#FFC596",
  });

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  var data3 = [];
  var data5 = [];

  elements1.forEach((element) => {
    if (element != null && element !== undefined && element !== "") {
      data3.push(element);
    }
  });

  data4.forEach((element) => {
    if (element != null && element !== undefined && element !== "") {
      data5.push(element);
    }
  });

  var listItems2 = [];

  var listItems1 = data3.map((data31, index) => [
    data31.props.height,
    data31.props.width,
    data31.props.x,
    data31.props.y,
  ]);

  var listItems = listItems1.map((data31, index) => (
    <Accordion
      expanded={index === expanded}
      onChange={() => handleChange({ index })}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>{index}</Typography>
      </AccordionSummary>
      <AccordionDetails className="params">
        <Typography>
          <div className="grid_item">Height: {data31[0]}</div>
          <div className="grid_item">Width: {data31[1]}</div>
          <div className="grid_item">Position X: {data31[2]} </div>
          <div className="grid_item">Position Y: {data31[3]} </div>
          <div className="grid_item">Class: {data31[4]} </div>
          <div className="grid_item">Actual height: {data31[5]} </div>
          <div className="grid_item">Orientation: {data31[6]} </div>
          <div className="grid_item">Transition element: {data31[7]} </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  ));

  const handleNextImage = () => {
    if (fileList.length > 0) {
      setImgIndex(imgIndex + 1);
      setImgSource1(URL.createObjectURL(fileList[imgIndex + 1]));
      console.log(fileList[0].name);
      console.log(imgSource1);
    } else {
      console.log("Hello");
    }
  };

  const handlePreviousImage = () => {
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1);
      setImgSource1(URL.createObjectURL(fileList[imgIndex - 1]));
    }
  };

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
    setChecked1(value);
  };

  function handleClass1Change(value) {
    setClass2(value);
  }

  const handleDialog1OK = (choose) => {
    if (draw) {
      if (choose) {
        setIsOpen(false);
        setData4([...data4, [class2, bins1, d1height1, checked1]]);
        console.log(bins1);
        console.log(class2);
        console.log(d1height1);
        console.log(checked1);
        console.log(data4);
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

  const handleFolderSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const directoryInput = document.createElement("input");
    directoryInput.setAttribute("type", "file");
    directoryInput.setAttribute("webkitdirectory", true);
    directoryInput.setAttribute("directory", true);
    directoryInput.setAttribute("multiple", true);
    directoryInput.click();
    directoryInput.addEventListener("change", handleFileSelect, false);
  };

  const handleFileSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = event.target.files;
    const pngFiles = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );
    setFileList(pngFiles);
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
    if (edit) {
      if (edit1) {
        setEdit1(false);
        setElements1([
          ...elements1,
          <rect
            className="rectangle"
            x={imgRefC[0] - editCoord[0]}
            y={imgRefC[1] - editCoord[1]}
            width={editData[1]}
            height={editData[0]}
          />,
        ]);
        setElements([
          ...elements,
          <rect
            x={imgRefC[0] - editCoord[0] - 6}
            y={imgRefC[1] - editCoord[1] - 6}
            width="12"
            height="12"
            fill="lightgreen"
          />,
        ]);
        setElements2([
          ...elements2,
          <rect
            x={imgRefC[0] - editCoord[0] + editData[1] - 6}
            y={imgRefC[1] - editCoord[1] + editData[0] - 6}
            width="12"
            height="12"
            fill="lightblue"
          />,
        ]);
      }
      if (edit2) {
        setEdit2(false);
        setElements1([
          ...elements1,
          <rect
            className="rectangle"
            x={editCoord2[0]}
            y={editCoord2[1]}
            width={imgRefC[0] - editCoord2[0]}
            height={imgRefC[1] - editCoord2[1]}
          />,
        ]);
        setElements([
          ...elements,
          <rect
            x={editCoord2[0] - 6}
            y={editCoord2[1] - 6}
            width="12"
            height="12"
            fill="lightgreen"
          />,
        ]);
        setElements2([
          ...elements2,
          <rect
            x={imgRefC[0] - 6}
            y={imgRefC[1] - 6}
            width="12"
            height="12"
            fill="lightblue"
          />,
        ]);
      }
    }
  };

  const handleDraw = () => {
    setDraw((current) => !current);
    setBtnClr((current) => !current);
    setEdit(false);
    setDel(false);
    setSel(false);
  };

  const handleEdit = () => {
    setEdit((current) => !current);
    setBtnClr((current) => !current);
    setDraw(false);
    setDel(false);
    setSel(false);
  };

  const handleDelete = () => {
    setDel((current) => !current);
    setBtnClr((current) => !current);
    setDraw(false);
    setEdit(false);
    setSel(false);
  };

  const handleSelect = () => {
    setSel((current) => !current);
    setBtnClr((current) => !current);
    setDraw(false);
    setEdit(false);
    setDel(false);
  };

  const handleMouseDown1 = (index) => {
    if (edit) {
      console.log(index);
    }
  };

  const handleMouseDown2 = (index, event) => {
    if (edit) {
      console.log(event.nativeEvent.offsetX);
      console.log(elements1[index]);
      setEditCoord([
        event.nativeEvent.offsetX - elements1[index].props.x,
        event.nativeEvent.offsetY - elements1[index].props.y,
      ]);
      setEdit1(true);
      setEditData([
        elements1[index].props.height,
        elements1[index].props.width,
      ]);
      delete elements1[index];
      delete elements[index];
      delete elements2[index];
    }
    if (del) {
      setDialog({
        message: "Are you sure you want to" + { index } + " delete?",
        isLoading: true,
      });
      setDelIndex(index);
    }
  };

  //useEffect(() => {
  //  if (edit1){
  //    let editCoordX = imgRefC[0] - editData[0]
  //    let editCoordY = imgRefC[1] - editData[1]
  //    setEditCoord([editCoordX, editCoordY])
  //  }
  //}, [imgRefC])

  const handleMouseDown3 = (index, event) => {
    if (edit) {
      console.log(elements2[index].props.x);
      setEditCoord2([elements1[index].props.x, elements1[index].props.y]);
      setEdit2(true);
      delete elements[index];
      delete elements1[index];
      delete elements2[index];
    }
  };

  const handleData = () => {
    console.log(listItems2);
  };

  const handleData1 = (index) => {
    if (edit) {
      setIndex1(index);
    }
  };

  useEffect(() => {
    for (let i = 0; i < listItems1.length; i++) {
      let innerArray = [];
      for (let j = 0; j < listItems1[i].length; j++) {
        innerArray.push(listItems1[i][j], data5[i][j]);
      }
      listItems2.push(innerArray);
    }
  }, [data4]);

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
        color: "#E5E4E2",
        backgroundColor: "#197ED6",
      });
      setDelBtnClr({});
      setEditBtnClr({});
      setSelBtnClr({});
    } else if (edit) {
      setDrawBtnClr({});
      setDelBtnClr({});
      setEditBtnClr({
        color: "#E5E4E2",
        backgroundColor: "#197ED6",
      });
      setSelBtnClr({});
    } else if (del) {
      setDrawBtnClr({});
      setDelBtnClr({
        color: "#E5E4E2",
        backgroundColor: "#197ED6",
      });
      setSelBtnClr({});
      setEditBtnClr({});
    } else if (sel) {
      setDrawBtnClr({});
      setDelBtnClr({});
      setEditBtnClr({});
      setSelBtnClr({
        color: "#E5E4E2",
        backgroundColor: "#197ED6",
      });
    } else {
      setDrawBtnClr({});
      setDelBtnClr({});
      setEditBtnClr({});
      setSelBtnClr({});
    }
  }, [btnClr]);

  return (
    <div className="main-div">
      <div className="header">
        <div className="head_left">
          <img
            src={Logo}
            alt="LOGO"
            height="60px"
            style={{ padding: "5px", marginLeft: "6px" }}
          />
          <p className="header_title">Annotator</p>
        </div>
        <div className="head_right">
          <button className="btn_logout">
            LOGOUT{" "}
            <p>
              {" "}
              <FiLogOut />{" "}
            </p>{" "}
          </button>
        </div>
      </div>
      <div className="setion-container">
        <div className="tool-ul">
          <IconContext.Provider value={{ size: "35px" }}>
            <Tooltip title="Click to show more options" placement="right">
              <div className="tool-button fst_btn" onClick={handleFolderSelect}>
                <h4>Add Data</h4>
                <p>
                  {" "}
                  <AiOutlineCloud />{" "}
                </p>
              </div>
            </Tooltip>
            <div className="sub-menu">
              <button className="adddata_btn">
                <h5>Add from local</h5>
              </button>
              <button className="adddata_btn">
                <h5>Add from cloud</h5>
              </button>
            </div>

            <Tooltip title="Click to activate Draw mode" placement="right">
              <div
                onClick={handleDraw}
                className="tool-button"
                style={drawBtnClr}
              >
                <h4>Draw</h4>
                <p>
                  {" "}
                  <FaDrawPolygon />{" "}
                </p>
              </div>
            </Tooltip>
            <Tooltip title="Click to activate edit mode" placement="right">
              <div
                onClick={handleEdit}
                className="tool-button"
                style={editBtnClr}
              >
                <h4>Edit</h4>
                <p>
                  {" "}
                  <CiEdit />{" "}
                </p>
              </div>
            </Tooltip>
            <Tooltip title="Click to activate delete mode" placement="right">
              <div
                onClick={handleDelete}
                className="tool-button"
                style={delBtnClr}
              >
                <h4>Delete</h4>
                <p>
                  {" "}
                  <AiOutlineDelete />{" "}
                </p>
              </div>
            </Tooltip>
            <Tooltip title="Click to activate select mode" placement="right">
              <div
                className="tool-button"
                onClick={handleSelect}
                style={selBtnClr}
              >
                <h4>Select</h4>
                <p>
                  {" "}
                  <GrSelect />{" "}
                </p>
              </div>
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
              pageX={coord1[1] + 62}
              pageY={coord1[0] + 111}
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
                src={imgSource1}
                alt={imgSource1.name}
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
            {edit1 && (
              <foreignObject
                className="imgref"
                x={imgRefC[0] - editCoord[0]}
                y={imgRefC[1] - editCoord[1]}
                height={editData[0]}
                width={editData[1]}
              >
                <div style={{ pointerEvents: "none" }}></div>
              </foreignObject>
            )}
            {edit2 && (
              <foreignObject
                className="imgref"
                x={editCoord2[0]}
                y={editCoord2[1]}
                height={imgRefC[1] - editCoord2[1]}
                width={imgRefC[0] - editCoord2[0]}
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
                <g
                  key={index}
                  onMouseDown={(event) => handleMouseDown2(index, event)}
                >
                  {element}
                </g>
              );
            })}
            {elements2.map((element, index) => {
              return (
                <g
                  key={index}
                  onMouseDown={(event) => handleMouseDown3(index, event)}
                >
                  {element}
                </g>
              );
            })}
          </svg>
          <div>
            <button onClick={handleNextImage}>Next Image</button>
            <button onClick={handlePreviousImage}>Previous Image</button>
          </div>
        </div>
        <div className="label-div">
          <div className="label-div1 label">
            Label List
            <ul>{listItems}</ul>
          </div>
          <div className="label-div1 label">
            Image List
            <ul>
              {" "}
              {fileList.map((file) => (
                <div key={file.name}> {file.name} </div>
              ))}{" "}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Canvas1;
