import React from "react";

import "./gallery-item.css";

interface IGalleryItem {
  img: string,
  tags: string,
  caption: string,
  alt: string
}

export default function GalleryItem({ img, tags, caption, alt } : IGalleryItem) {
  return (
    <div className="polaroid-wrapper">
      <div className="polaroid">
        <img src={img} className="gallery-img" alt={alt} />
        <div className="polaroid-container">
          <p>{tags}</p>
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
}