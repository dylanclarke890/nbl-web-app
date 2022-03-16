import format from "date-fns/format";
import React from "react";

import ICustomDateInput from "./ICustomDateInput";

export default function CustomDateInput({ inputId, labelText, value, error, onChange, readOnly }: ICustomDateInput) {
  return (
    <>
      <label htmlFor={inputId} className="custom-date-input">
        {labelText}
      </label>
      <input id={inputId} type="date" value={format(value, "yyyy-MM-dd")} disabled={readOnly} onChange={e => onChange(e.currentTarget.value)} />
    </>
  );
}