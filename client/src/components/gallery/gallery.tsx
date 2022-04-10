import React from "react";

import GalleryImageRow from "./image-row/gallery-image-row";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";

import "./gallery.css";

export default function Gallery() {
  return (
    <>
      <TitleAndDesc title="Gallery" desc="Check out my previous work!" />
      <div className="gallery-images mt-3">
        <GalleryImageRow />
      </div>
    </>
  );
}
