import React from "react";

import ICustomTextArea from "./ICustomTextArea";

import './custom-textarea.css';

export default function CustomTextArea({ inputId, value, error, active, onChange, readonly }: ICustomTextArea) {
  return (
    <div className="custom-field">
      <textarea
        id={inputId}
        placeholder="&nbsp;"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        readOnly={readonly}
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
