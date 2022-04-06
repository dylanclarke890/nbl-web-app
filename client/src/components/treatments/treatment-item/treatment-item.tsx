import React from "react";
import ITreatmentItem from "./ITreatmentItem";

import './treatment-item.css';

export default function TreatmentItem({ treatment }: ITreatmentItem) {
  return (
    <div className="treatment">
      <div className="flex justify-between">
        <div className="treatment-type">{treatment.type}</div>
        <div className="treatment-separator"></div>
        <div className="treatment-price">&#163; {treatment.price}
        </div>
      </div>
      <div className="treatment-desc">{treatment.description} <span className="treatment-duration">{treatment.duration} mins</span></div>
    </div>
  )
}