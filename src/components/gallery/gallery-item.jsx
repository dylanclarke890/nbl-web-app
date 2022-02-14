import React from "react";

import "../../styles/gallery/gallery-item.css";

export default function GalleryItem({ img, tags, caption, alt }) {
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