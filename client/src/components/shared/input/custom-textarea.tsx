import React from "react";

import './custom-textarea.css';

interface TextArea {
  inputId: string,
  error: string,
  active: boolean,
  onChange: any,
}

export default function CustomTextArea({ inputId, error, active, onChange }: TextArea) {
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
