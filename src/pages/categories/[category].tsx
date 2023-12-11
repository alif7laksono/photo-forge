// pages/categories/[category].tsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
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
import { FaDownload, FaHeart, FaPlus } from "react-icons/fa";
import PopupImageDetail from "@/components/PopupImageDetail";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import "./styles.css";

const CategoryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const router = useRouter();
  const { category } = router.query;

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const nextImage = () => {
    const currentIndex = imageList.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const nextIndex = (currentIndex + 1) % imageList.length;
    setSelectedImage(imageList[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = imageList.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
    setSelectedImage(imageList[prevIndex]);
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

  const getImageDataByCategory = () => {
    switch (category) {
      case "nature":
        return natureImages;
      case "experimental":
        return experimentalImages;
      case "animals":
        return animalsImages;
      case "holidays":
        return holidaysImages;
      case "wallpapers":
        return wallpaperImages;
      case "film":
        return filmImages;
      case "travel":
        return travelImages;
      case "people":
        return peopleImages;
      case "sports":
        return sportsImages;
      default:
        return [];
    }
  };

  const imageList = category ? getImageDataByCategory() : [];

  return (
    <div>
      <Header />
      <Nav />

      <div className="mainContainer">
        <div className="heroSection">
          <h1>{category} Photos</h1>
          <p>Explore beautiful {category} images from our collection.</p>
        </div>

        <div className="imageContainer">
          {imageList.map((image: ImageType) => (
            <div
              key={image.id}
              className="imageCard"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={300}
                height={200}
              />
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
                <FaHeart className="likeIcon" />
                <FaPlus className="plusIcon" />
              </div>
            </div>
          ))}
        </div>
      </div>
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
  );
};

export default CategoryPage;
