// PopupImageDetail.tsx
import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { PopupImageDetailProps, ImageType } from "@/data/types";
import {
  FaEye,
  FaDownload,
  FaRegCalendarAlt,
  FaCamera,
  FaPlus,
  FaHeart,
} from "react-icons/fa";
import "./style.css";

const donwloadImage = (image: ImageType) => {
  fetch(image.url)
    .then((response) => response.blob())
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${image.title}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(() => alert("Could not download the image"));
};

const PopupImageDetail: React.FC<PopupImageDetailProps> = ({
  image,
  open,
  onClose,
  nextImage,
  prevImage,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextImage();
      } else if (event.key === "ArrowLeft") {
        prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextImage, prevImage]);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={`modal-box ${isFullScreen ? "full-screen" : ""}`}>
        <div className="icons">
          <div className="icons-left">
            <Button variant="outlined">Share</Button>
            <Button variant="outlined">Info</Button>
          </div>
          <div className="icons-right">
            <FaPlus className="icon" />
            <FaHeart className="icon" />
            <Button
              className="download-button"
              variant="outlined"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                donwloadImage(image);
              }}
            >
              Download
            </Button>
          </div>
        </div>
        <img
          src={image.url}
          alt={image.title}
          className={`modal-image ${isFullScreen ? "full-screen-image" : ""}`}
          onClick={toggleFullScreen}
        />
        <Typography variant="h6" className="title">
          {image.title}
        </Typography>
        <div className="icon-line">
          <div>
            <FaEye />
            <span>{image.views}</span>
          </div>
          <div>
            <FaDownload />
            <span>{image.downloads}</span>
          </div>
          <div>
            <FaRegCalendarAlt />
            <span>{image.published}</span>
          </div>
          <div>
            <FaCamera />
            <span>{image.camera}</span>
          </div>
          <div>Category : {image.category}</div>
        </div>
      </Box>
    </Modal>
  );
};

export default PopupImageDetail;
