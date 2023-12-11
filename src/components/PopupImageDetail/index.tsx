// PopupImageDetail.tsx
import React, { useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { PopupImageDetailProps } from "@/data/types";
import { FaEye, FaDownload, FaRegCalendarAlt, FaCamera } from "react-icons/fa";
import "./style.css";

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
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-box">
        <img src={image.url} alt={image.title} className="modal-image" />
        <Typography variant="h6">{image.title}</Typography>
        <div className="icon-line">
          <FaEye />  : {image.views}
          <FaDownload />  : {image.downloads}
          <FaRegCalendarAlt />  : {image.published}
          <FaCamera />  : {image.camera}
        </div>
      </Box>
    </Modal>
  );
};

export default PopupImageDetail;
