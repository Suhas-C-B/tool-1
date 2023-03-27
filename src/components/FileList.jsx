import React, { useState } from 'react';

function FileList() {
  const [fileList, setFileList] = useState([]);
  const [droppedFile, setDroppedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFolderSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const directoryInput = document.createElement('input');
    directoryInput.setAttribute('type', 'file');
    directoryInput.setAttribute('webkitdirectory', true);
    directoryInput.setAttribute('directory', true);
    directoryInput.setAttribute('multiple', true);
    directoryInput.click();
    directoryInput.addEventListener('change', handleFilesSelect, false);
  };

  const handleFilesSelect = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const fileList = event.target.files;
    const pngFiles = Array.from(fileList).filter(file => file.type === "image/png");
    setFileList(pngFiles);
  };
  

  const handleFileDragStart = (event, file) => {
    event.dataTransfer.setData('text/plain', file.name);
    event.dataTransfer.dropEffect = 'move';
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const fileName = event.dataTransfer.getData('text/plain');
    const file = fileList.find((file) => file.name === fileName);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setDroppedFile({
          name: file.name,
          url: event.target.result,
        });
      };
      fileReader.readAsDataURL(file);
    }
    setDragging(false);
  };

  const handleRemoveFile = () => {
    setDroppedFile(null);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  return (
    <div className="app">
      <button onClick={handleFolderSelect} className="select-folder">Select Folder</button>
      <div className="file-container">
        {fileList.map((file) => (
          <div
            key={file.name}
            draggable
            onDragStart={(event) => handleFileDragStart(event, file)}
          >
            {file.name}
          </div>
        ))}
      </div>
      <div
        className={`center-div ${dragging ? 'dragging' : ''}`}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {droppedFile ? (
          <div className="dropped-file-container">
            <img src={droppedFile.url} alt={droppedFile.name} />
            <button onClick={handleRemoveFile}>Remove Image</button>
          </div>
        ) : (
          <div className="drop-here-container">
            <p>Drop your file here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileList;
