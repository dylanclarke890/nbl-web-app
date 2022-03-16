import React from "react";

import ICustomTimeInput from "./ICustomTimeInput";

export default function CustomTimeInput({ inputId, labelText, value, error, onChange, readOnly }: ICustomTimeInput) {
  return (
    <>
      <label htmlFor={inputId} className="custom-time-input">
        {labelText}
      </label>
      <input id={inputId} type="time" value={value} disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
    </>
  );
}