import React from 'react';

import './custom-input.css';

export default function CustomInput({ inputId, labelText, value, error, active, onChange, onKeyPress, readonly, password }: ICustomInput) {
  return (
    <div className="custom-field">
      <input id={inputId} type={password ? "password" : "text"} value={value} placeholder="&nbsp;" onKeyPress={onKeyPress} readOnly={readonly} onChange={e => onChange(e.currentTarget.value)} />
      <label htmlFor={inputId} className={active ? 'placeholder has-content' : 'placeholder'}>Enter {labelText === undefined ? inputId : labelText}</label>
      <span className="error-message" aria-live="polite">{error}</span>
    </div>
  );
}