import React from "react";
import ICustomCheckbox from "../../../interfaces/ICustomCheckbox";

export default function CustomCheckbox({ inputId, labelText, isChecked, onChange, disabled }: ICustomCheckbox) {
  return (
    <label htmlFor={inputId} className="custom-checkbox">
      <input id={inputId} type="checkbox" disabled={disabled} checked={isChecked} onChange={e => onChange(e.currentTarget.value)} />
      {labelText}
    </label>
  );
}