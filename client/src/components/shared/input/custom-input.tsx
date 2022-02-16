import React from 'react';

import './custom-input.css';

export default function CustomInput({inputId, error, active, onChange, onKeyPress}){
  return (
    <div className="custom-field">
    <input id={inputId} type="text" placeholder="&nbsp;" onKeyPress={onKeyPress}  onChange={e => onChange(e.currentTarget.value)}/> 
    <label htmlFor={inputId} className={active ? 'placeholder has-content' : 'placeholder'}>Enter {inputId}</label>
    <span className="error-message" aria-live="polite">{error}</span>
  </div>
  );
}