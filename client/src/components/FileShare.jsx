import React, { useEffect, useState } from "react";
import "./FileShare.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import FileExpire from "./FileExpire";
import PopUp from "./PopUp";

function FileShare() {
  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  const { id } = useParams();
  const [wait, setWait] = useState(false);
  const [url, setUrl] = useState(null);
  const [expire, setExpire] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [copyUrl, setCopyUrl] = useState("");

  useEffect(() => {
    (async () => {
      setWait(true);
      const response = await axios.post(
        "http://localhost:3000/api/v1/viewUrl",
        {
          fileName: id,
        }
      );
      // Fetch download URL
      const downloadResponse = await axios.post(
        "http://localhost:3000/api/v1/downloadUrl",
        { fileName: id }
      );
      if (response.data.url && downloadResponse.data.url) {
        setWait(false);
        setUrl(response.data.url);
        setDownloadUrl(downloadResponse.data.url);
        setExpire(false);
      } else {
        setWait(false);
        setUrl(null);
        setExpire(true);
      }
    })();
  }, [id]);

  const handleShare = () => {
    const shareUrl = fullUrl || url || viewUrl;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopyUrl("Link copied to clipboard!");
      setTimeout(() => setCopyUrl(""), 2000); // Clear message after 2 seconds
    });
  };

  if (expire) {
    return <FileExpire />;
  }

  return (
    <div className="hero-container">
      <h1>Share Files Easily</h1>
      <p>File Link Will Be Expire In A Day !</p>
      <div className="share-container">
        <button
          className="upload-btn"
          onClick={() => window.open(url, "_blank")}
          disabled={!url}
        >
          View
        </button>
        <button
          className="upload-btn"
          onClick={() => window.open(downloadUrl, "_blank")}
          disabled={!downloadUrl}
        >
          Download
        </button>
        <button className="upload-btn" onClick={handleShare}>
          Share
        </button>
      </div>
      {wait && <PopUp msg="Please Wait..." />}
      {copyUrl && <PopUp msg={copyUrl} />}
    </div>
  );
}

export default FileShare;
