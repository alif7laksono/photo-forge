// components/ImageDetail.tsx

import React from "react";
import { ImageType } from "@/data/types";

interface ImageDetailProps {
  image: ImageType;
  onClose: () => void;
}

const ImageDetail: React.FC<ImageDetailProps> = ({ image, onClose }) => {
  return (
    <div className="imageDetailPopup">
      <h2>{image.title}</h2>
      <img src={image.url} alt={image.title} />
      <p>{image.published}</p>
      <p>{image.camera}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ImageDetail;
