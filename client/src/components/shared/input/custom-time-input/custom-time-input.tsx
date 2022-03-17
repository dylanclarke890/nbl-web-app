import React from "react";

import ICustomTimeInput from "./ICustomTimeInput";

import './custom-time-input.css';

export default function CustomTimeInput({ inputId, labelText, value, error, onChange, readOnly }: ICustomTimeInput) {
  return (
    <>
      <label htmlFor={inputId} className="custom-time-label">
        {labelText}
      </label>
      <input id={inputId} type="time" value={value} disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
    </>
  );
}