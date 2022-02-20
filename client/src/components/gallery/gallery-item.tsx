import React from "react";
import IGalleryItem from "../../interfaces/IGalleryItem";

import "./gallery-item.css";

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