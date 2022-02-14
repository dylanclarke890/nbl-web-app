import React from "react";

import "../../styles/gallery.css";

export default function GalleryItem({ img, tags, caption, alt }) {
  return (
    <div className="polaroid-wrapper">
      <div className="polaroid">
        <img src={img} className="gallery-img" alt={alt} />
        <div className="container">
          <p>{tags}</p>
          <p>{caption}</p>
        </div>
      </div>
    </div>
  );
}