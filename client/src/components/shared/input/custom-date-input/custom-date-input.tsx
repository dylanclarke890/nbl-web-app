import format from "date-fns/format";
import React from "react";

import ICustomDateInput from "./ICustomDateInput";

import './custom-date-input.css';

export default function CustomDateInput({ inputId, labelText, value, error, onChange, readOnly }: ICustomDateInput) {
  return (
    <>
    <div>
      <label htmlFor={inputId} className="custom-date-label">
        {labelText}
      </label>
      <input id={inputId} type="date" value={format(value, "yyyy-MM-dd")} disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
      <p className={`mt-1 ${error ? "error-message" : null}`}>{error}</p>
    </div>
    </>
  );
}