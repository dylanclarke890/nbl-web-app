import React from "react";

import ICustomTimeInput from "./ICustomTimeInput";

export default function CustomTimeInput({ inputId, labelText, onChange, readOnly }: ICustomTimeInput) {
  return (
    <label htmlFor={inputId} className="custom-time-input">
      <input id={inputId} type="time" disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
      {labelText}
    </label>
  );
}