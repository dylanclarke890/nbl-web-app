import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import useOnInitialized from "../../custom-hooks/onInitialized";

import ContactForm from "../shared/input/contact-form";
import CustomTextArea from "../shared/input/custom-textarea";

import "./contact.css";

export default function Contact() {
  const [inputValidation, setInputValidation] = useState({
    name: "", email: "", phone: "", message: "", error: false
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const validateMessage = useCallback(() => {
    if (!message) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "Must provide a message.",
        error: true
      }))
    } else if (message.length < 3 || message.length > 500) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "Must be between 3 and 500 characters.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "",
        error: false
      }));
    }
  }, [message])

  useEffect(() => {
    validateMessage();
  }, [message, validateMessage])

  useOnInitialized(() => {
    setInputValidation({ name: "", email: "", phone: "", message: "", error: false });
  }, [])

  const submit = () => {
  };

  return (
    <div className="contact-content">
      <p className="text-center contact-title">Contact Us</p>
      <div className="contact-form">
        <ContactForm inputValidation={inputValidation} setInputValidation={setInputValidation} name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
        <CustomTextArea inputId={'message'} active={message !== ""} error={inputValidation.message} onChange={setMessage} />
        <br />
        <div className="form-button">
          <button onClick={submit} className="contact-btn" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
