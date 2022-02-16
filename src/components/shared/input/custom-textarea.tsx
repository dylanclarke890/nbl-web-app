import React from "react";

import './custom-textarea.css';

export default function CustomTextArea({ inputId, error, active, onChange }) {
  return (
    <div className="custom-contact-field">
      <textarea
        id={inputId}
        placeholder="&nbsp;"
        onChange={e => onChange(e.currentTarget.value)}
      />
      <label
        htmlFor={inputId}
        className={
          active
            ? "contact-placeholder has-content"
            : "contact-placeholder"
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
