const base_url = import.meta.env.VITE_BASE_URL;

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HeroSection.css";
import Loading from "./Loding";

const HeroSection = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(-1);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadHandler = async () => {
    if (!file) return;
    setProgress(0);
    try {
      // Step 1: Request presigned URL from backend
      const response = await axios.post(`${base_url}/api/v1/getUrl`, {
        fileName: file.name,
        fileType: file.type,
      });

      const { url, fileName } = response.data;

      // Step 2: Upload file to S3 using the presigned URL
      const uploadResponse = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentComplete);
        },
      });
      setProgress(-1);
      if (uploadResponse.status === 200) {
        setFile(null);

        setProgress(-1);
        navigate(`/file/${fileName}`);
      } else {
        alert("Upload failed. Please try again.");
        setFile(null);

        setProgress(-1);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Please try again.");
      setFile(null);
      setProgress(-1);
    }
  };

  return (
    <div className="hero-container">
      <h1>Share Files Easily</h1>
      <p>Upload your files and share them with anyone, anywhere</p>

      {!file ? (
        <button className="upload-btn" onClick={() => inputRef.current.click()}>
          Choose File
        </button>
      ) : (
        <button className="upload-btn" onClick={uploadHandler}>
          Upload Files
        </button>
      )}

      <input
        type="file"
        className="file-upload"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the default file input
      />
      {file && <p className="file-name">{file.name}</p>}

      {progress > -1 && progress < 101 && <Loading progress={progress} />}
    </div>
  );
};

export default HeroSection;
