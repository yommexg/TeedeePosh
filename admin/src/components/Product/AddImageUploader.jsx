import React from "react";

import "./ImageUpload.css";

const AddImageUploader = ({
  file1,
  file2,
  file3,
  setFile1,
  setFile2,
  setFile3,
}) => {
  const handleDrop1 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setFile1(files[0]);
  };
  const handleFileChange1 = (e) => {
    const files = e.target.files;
    setFile1(files[0]);
  };

  const handleDrop2 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setFile2(files[0]);
  };
  const handleFileChange2 = (e) => {
    const files = e.target.files;
    setFile2(files[0]);
  };

  const handleDrop3 = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setFile3(files[0]);
  };

  const handleFileChange3 = (e) => {
    const files = e.target.files;
    setFile3(files[0]);
  };

  return (
    <div className="images-container">
      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={handleDrop1}>
        {!file1 && (
          <React.Fragment>
            <span className="dropImage">Drop your images here or </span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange1}
            />
          </React.Fragment>
        )}
        {file1 && (
          <div className="upload-product-image-container">
            <img
              className="upload-product-image"
              src={URL.createObjectURL(file1)}
              alt="Uploaded"
              accept="image/*"
              name="productImg"
              // onClick={() => console.log(file1)}
            />
            <button onClick={() => setFile1(null)}>Change Image</button>
          </div>
        )}
      </div>

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={handleDrop2}>
        {!file2 && (
          <React.Fragment>
            <span className="dropImage">Drop your images here or </span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange2}
            />
          </React.Fragment>
        )}
        {file2 && (
          <div className="upload-product-image-container">
            <img
              className="upload-product-image"
              src={URL.createObjectURL(file2)}
              alt="Uploaded"
              accept="image/*"
              name="productImg"
            />
            <button onClick={() => setFile2(null)}>Change Image</button>
          </div>
        )}
      </div>

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={handleDrop3}>
        {!file3 && (
          <React.Fragment>
            <span className="dropImage">Drop your images here or </span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange3}
            />
          </React.Fragment>
        )}
        {file3 && (
          <div className="upload-product-image-container">
            <img
              className="upload-product-image"
              src={URL.createObjectURL(file3)}
              alt="Uploaded"
              accept="image/*"
              name="productImg"
            />
            <button onClick={() => setFile3(null)}>Change Image</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddImageUploader;