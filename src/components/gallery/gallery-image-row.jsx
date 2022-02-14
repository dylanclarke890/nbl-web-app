import React from "react";

import samplework1 from "../../images/portfolio/samplework1.jpg";
import samplework2 from "../../images/portfolio/samplework2.jpg";
import samplework3 from "../../images/portfolio/samplework3.jpg";
import samplework4 from "../../images/portfolio/samplework4.jpg";
import samplework5 from "../../images/portfolio/samplework5.jpg";
import GalleryItem from "./gallery-item";
import '../../styles/gallery/gallery.css';

export default function GalleryImageRow(){
  return (
    <div className="gallery-image-row">
          <GalleryItem
            alt="samplework1"
            img={samplework1}
            tags="#hybridextensions #dolleye #cateyelashes #tattilashes
                  #tattilashextensions"
            caption={""}
          />
          <GalleryItem
            alt="samplework2"
            img={samplework2}
            tags="#lashextensions #fluffylashes #browdefinition #browshaping"
            caption={"🧚 🧚 🧚"}
          />
          <GalleryItem
            alt="samplework3"
            img={samplework3}
            tags="#valentinesnails #biabnails"
            caption={"using baby biab and gold foil for some cute little hearts 💕"}
          />
          <GalleryItem
            alt="samplework4"
            img={samplework4}
            tags="#browlamination #brows #malebrows #malemodel"
            caption={"From basic to boujee 💅🏻"}
          />
          <GalleryItem
            alt="samplework5"
            img={samplework5}
            tags="#heartless #nails #leopardprint #nailfoil"
            caption={"Heartless BIAB by @the_gelbottle_inc with silver and black leopard print foil"}
          />
        </div>
  );
}