import React from "react";
import ITreatmentItem from "./ITreatmentItem";

import './treatment-item.css';

export default function TreatmentItem({ treatment }: ITreatmentItem) {
  return (
    <div className="treatment-option">
      <div className="flex justify-between">
        <div className="treatment-option-type">{treatment.type}</div>
        <div className="treatment-option-separator"></div>
        <div className="treatment-option-duration">&#163; {treatment.price}
        </div>
      </div>
      <div className="treatment-option-desc">{treatment.description} ({treatment.duration})</div>
    </div>
  )
}