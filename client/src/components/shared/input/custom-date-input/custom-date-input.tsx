import React from "react";

import ICustomDateInput from "./ICustomDateInput";

export default function CustomDateInput({ inputId, labelText, onChange, readOnly }: ICustomDateInput) {
  return (
    <label htmlFor={inputId} className="custom-date-input">
      <input id={inputId} type="date" disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
      {labelText}
    </label>
  );
}