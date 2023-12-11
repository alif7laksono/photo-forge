// app/pages/search/[search].tsx
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import PopupImageDetail from "@/components/PopupImageDetail";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
import "./styles.css";

const SearchResults = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const router = useRouter();
  const { search } = router.query;
  const [results, setResults] = useState<ImageType[]>([]);

  useEffect(() => {
    if (search) {
      const searchTerm = search.toString().toLowerCase();
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

      // Filter combined array
      const filteredImages = allImages.filter((image: ImageType) =>
        image.title.toLowerCase().includes(searchTerm)
      );
      setResults(filteredImages);
    }
  }, [search]);

  const handleImageClick = (image: ImageType) => {
    setSelectedImage(image);
  };

  const nextImage = () => {
    const currentIndex = results.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const nextIndex = (currentIndex + 1) % results.length;
    setSelectedImage(results[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = results.findIndex(
      (img) => img.id === selectedImage?.id
    );
    const prevIndex = (currentIndex - 1 + results.length) % results.length;
    setSelectedImage(results[prevIndex]);
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
    <>
      <Header />
      <Nav />

      <div className="mainContainer">
        {results.length === 0 ? (
          <div className="not-found">No Movies Found</div>
        ) : (
          <div className="imageContainer">
            {results.map((image) => (
              <div
                key={image.id}
                className="imageCard"
                onClick={() => handleImageClick(image)}
              >
                <img
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
                  <FaPlus className="plusIcon" />
                  <FaHeart className="likeIcon" />
                </div>
              </div>
            ))}
          </div>
        )}
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
    </>
  );
};

export default SearchResults;
