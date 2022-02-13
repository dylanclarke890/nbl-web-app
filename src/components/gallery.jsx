import React from "react";
import samplework1 from "../images/portfolio/samplework1.jpg";
import samplework2 from "../images/portfolio/samplework2.jpg";
import samplework3 from "../images/portfolio/samplework3.jpg";
import samplework4 from "../images/portfolio/samplework4.jpg";
import samplework5 from "../images/portfolio/samplework5.jpg";
import "../styles/gallery.css";

export default function Gallery() {
  return (
    <div className="gallery-images">
      <div className="gallery-image-row">
        <div className="polaroid-wrapper">
          <div className="polaroid">
            <img src={samplework1} className="gallery-img" alt="samplework1" />
            <div className="container">
              <p>
                #hybridextensions #dolleye #cateyelashes #tattilashes
                #tattilashextensions
              </p>
            </div>
          </div>
        </div>
        <div className="polaroid-wrapper">
          <div className="polaroid">
            <img src={samplework2} className="gallery-img" alt="samplework2" />
            <div className="container">
              <p>🧚 🧚 🧚 </p>
              <p>#lashextensions #fluffylashes #browdefinition #browshaping</p>
            </div>
          </div>
        </div>
        <div className="polaroid-wrapper">
          <div className="polaroid">
            <img src={samplework3} className="gallery-img" alt="samplework3" />
            <div className="container">
              <p>
                using baby biab and gold foil for some cute little hearts 💕
              </p>
              <p>#valentinesnails #biabnails</p>
            </div>
          </div>
        </div>
        <div className="polaroid-wrapper">
          <div className="polaroid">
            <img src={samplework4} className="gallery-img" alt="samplework4" />
            <div className="container">
              <p>From basic to boujee 💅🏻 </p>
              <p>#browlamination #brows #malebrows #malemodel</p>
            </div>
          </div>
        </div>
        <div className="polaroid-wrapper">
          <div className="polaroid">
            <img src={samplework5} className="gallery-img" alt="samplework5" />
            <div className="container">
              <p>
                Heartless BIAB by @the_gelbottle_inc with silver and black
                leopard print foil
              </p>
              <p> #heartless #nails #leopardprint #nailfoil</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
