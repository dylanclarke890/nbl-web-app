import React from "react";

import ICustomCheckbox from "./ICustomCheckbox";

export default function CustomCheckbox({ inputId, labelText, isChecked, onChange, readOnly }: ICustomCheckbox) {
  return (
    <label htmlFor={inputId} className="custom-checkbox">
      <input id={inputId} type="checkbox" disabled={readOnly} checked={isChecked} onChange={e => onChange(e.currentTarget.value)} />
      {labelText}
    </label>
  );
}