import React from "react";

import ITreatmentOptionSelector from "./ITreatmentOptionSelector";

export default function TreatmentOptionSelector({
  treatmentOptionButtons
}: ITreatmentOptionSelector) {
  return <>
    <div className="treatment-selector title text-center ">
      <div className="mt-1 mb-1 fade-in">Please select the treatment you would like:</div>
      <div className="treatment-options mt-1">
        {treatmentOptionButtons}
      </div>
    </div>
  </>;
}
