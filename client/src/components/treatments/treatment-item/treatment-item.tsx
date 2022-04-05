import React, { useState } from "react"
import ITreatmentItem from "./ITreatmentItem"

import './treatment-item.css';

export default function TreatmentItem({ treatment }: ITreatmentItem) {
  const [displayDesc, setDisplayDesc] = useState(false);
  const toggleDesc = () => setDisplayDesc(curr => !curr);
  
  return (
    <div className="treatment-option">
      <div className="flex">
        <div className="treatment-option-type">{treatment.type}</div>
        <div className="treatment-option-separator"></div>
        <div className="treatment-option-duration">&#163; {treatment.price}
          <button className="plus-button plus-button-sm" onClick={toggleDesc}></button>
        </div>
      </div>
      <div className="treatment-option-desc">{displayDesc ? treatment.description : ""}</div>
    </div>
  )
}