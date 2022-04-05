import React from "react"
import ITreatmentItem from "./ITreatmentItem"

import './treatment-item.css';

export default function TreatmentItem({ treatment }: ITreatmentItem) {
  // const [displayDesc, setDisplayDesc] = useState(false);
  // const toggleDesc = () => setDisplayDesc(curr => !curr);

  // // const button = treatment.description ?
  // //   <button className="plus-button plus-button-sm" onClick={toggleDesc}></button> : null;
  
  return (
    <div className="treatment-option">
      <div className="flex justify-between">
        <div className="treatment-option-type">{treatment.type}</div>
        <div className="treatment-option-separator"></div>
        <div className="treatment-option-duration">&#163; {treatment.price}
        </div>
      </div>
      <div className="treatment-option-desc">{treatment.description}</div>
    </div>
  )
}