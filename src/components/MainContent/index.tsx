// components/MainLayout.tsx
"use client";
import React, { useState } from "react";
import {
  natureImages,
  experimentalImages,
  animalsImages,
  holidaysImages,
  wallpaperImages,
  filmImages,
  peopleImages,
  travelImages,
  sportsImages,
} from "@/data/data";
import { ImageType } from "@/data/types";
import PopupImageDetail from "@/components/PopupImageDetail";
import { FaDownload, FaHeart, FaPlus } from "react-icons/fa";
import Image from "next/image";
import "./styles.css";

const MainLayout: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const allImages = [
    ...natureImages,
    ...experimentalImages,
    ...animalsImages,
    ...holidaysImages,
    ...wallpaperImages,
    ...filmImages,
    ...peopleImages,
    ...travelImages,
    ...sportsImages,
  ];

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const nextImage = () => {
    const currentIndex = allImages.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const nextIndex = (currentIndex + 1) % allImages.length;
    setSelectedImage(allImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = allImages.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[prevIndex]);
  };

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

  return (
    <div className="mainContainer">
      <div className="imageContainer">
        {allImages.map((image) => (
          <div
            key={image.id}
            className="imageCard"
            onClick={() => handleImageClick(image)}
          >
            <Image src={image.url} alt={image.title} width={300} height={200} />
            <div className="imageInfo">
              <p className="publisher">{image.title}</p>
              <FaDownload
                className="downloadIcon"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  donwloadImage(image);
                }}
              />
            </div>
            <div className="topIcons">
              <FaPlus className="plusIcon" />
              <FaHeart className="likeIcon" />
            </div>
          </div>
        ))}
        {selectedImage && (
          <PopupImageDetail
            imageUrl={selectedImage.url}
            title={selectedImage.title}
            onClose={() => setSelectedImage(null)}
            open={selectedImage !== null}
            image={selectedImage}
            nextImage={nextImage}
            prevImage={prevImage}
          />
        )}
      </div>
    </div>
  );
};
export default MainLayout;
