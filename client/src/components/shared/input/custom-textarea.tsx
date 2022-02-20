import React from "react";
import ICustomTextArea from "../../../interfaces/ICustomTextArea";

import './custom-textarea.css';

export default function CustomTextArea({ inputId, error, active, onChange }: ICustomTextArea) {
  return (
    <div className="custom-field">
      <textarea
        id={inputId}
        placeholder="&nbsp;"
        onChange={e => onChange(e.currentTarget.value)}
      />
      <label
        htmlFor={inputId}
        className={
          active
            ? "placeholder has-content"
            : "placeholder"
        }
      >
        Enter {inputId}
      </label>
      <span className="error-message" aria-live="polite">
        {error}
      </span>
    </div>
  );
}
