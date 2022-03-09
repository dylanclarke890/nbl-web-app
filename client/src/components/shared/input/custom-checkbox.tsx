import React from "react";
import ICustomCheckbox from "../../../interfaces/ICustomCheckbox";

export default function CustomCheckbox({ inputId, labelText, isChecked, onChange }: ICustomCheckbox) {
  return (
    <label htmlFor={inputId} className="custom-checkbox">
      <input id={inputId} type="checkbox" checked={isChecked} onChange={e => onChange(e.currentTarget.value)} />
      {labelText}
    </label>
  );
}