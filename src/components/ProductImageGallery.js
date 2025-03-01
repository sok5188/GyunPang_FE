import React, { useState, useEffect } from 'react';

function ProductImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={images[currentImageIndex]} alt="상품 이미지" />
      </div>
      <div className="image-thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`thumbnail-${index}`}
            onMouseEnter={() => setCurrentImageIndex(index)}
            className={index === currentImageIndex ? 'active' : ''}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;
