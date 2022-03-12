import React from "react";

import GalleryImageRow from "./image-row/gallery-image-row";
import "./gallery.css";

export default function Gallery() {
  return (
    <div className="gallery-images">
      <GalleryImageRow />
    </div>
  );
}
