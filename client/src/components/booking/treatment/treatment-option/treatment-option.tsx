import React from "react";
import { Link } from "react-router-dom";

import ITreatmentOption from "./ITreatmentOption";

export default function TreatmentOption({
  delay,
  item
}: ITreatmentOption) {
  return (
    <div className={`fade-in delay-${delay}`}>
      <Link className="btn btn-sm" to={`make-a-booking/${item._id}`}>{item.type}</Link>
    </div>
  );
}
