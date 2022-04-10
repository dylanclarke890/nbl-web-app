import React from "react";

import GalleryItem from "./gallery-item/gallery-item";

import './../gallery.css';

import samplework1 from "../../../images/portfolio/samplework1.jpg";
import samplework2 from "../../../images/portfolio/samplework2.jpg";
import samplework3 from "../../../images/portfolio/samplework3.jpg";
import samplework4 from "../../../images/portfolio/samplework4.jpg";
import samplework5 from "../../../images/portfolio/samplework5.jpg";

export default function GalleryImageRow() {
  return (
    <div className="gallery-image-row">
      <div className="fade-in">
        <GalleryItem
          alt="samplework1"
          img={samplework1}
          tags="#hybridextensions #dolleye #cateyelashes #tattilashes
                  #tattilashextensions"
          caption={""}
        />
      </div>
      <div className="fade-in delay-200">
        <GalleryItem
          alt="samplework2"
          img={samplework2}
          tags="#lashextensions #fluffylashes #browdefinition #browshaping"
          caption={"🧚 🧚 🧚"}
        />
      </div>
      <div className="fade-in delay-400">
        <GalleryItem
          alt="samplework3"
          img={samplework3}
          tags="#valentinesnails #biabnails"
          caption={"using baby biab and gold foil for some cute little hearts 💕"}
        />
      </div>
      <div className="fade-in delay-600">
        <GalleryItem
          alt="samplework4"
          img={samplework4}
          tags="#browlamination #brows #malebrows #malemodel"
          caption={"From basic to boujee 💅🏻"}
        />
      </div>
      <div className="fade-in delay-800">
        <GalleryItem
          alt="samplework5"
          img={samplework5}
          tags="#heartless #nails #leopardprint #nailfoil"
          caption={"Heartless BIAB by @the_gelbottle_inc with silver and black leopard print foil"}
        />
      </div>
    </div>
  );
}