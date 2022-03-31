import React, { useState, useEffect, useContext } from "react";
import { useCallback } from "react";
import { LoadingContext } from "../../contexts/loading-context/loading-context";
import { ToastContext } from "../../contexts/toast-context/toast-context";
import useOnInitialized from "../../custom-hooks/useOnInitialized";

import ContactForm from "../shared/forms/contact-form/contact-form";
import CustomTextArea from "../shared/input/custom-textarea/custom-textarea";

import "./contact.css";

export default function Contact() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

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

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while sending message."), [])
  useEffect(() => {
    if (loading) return;
    isLoading();
    validateMessage();
    if (inputValidation.error) {
      onError();
      loaded();
      return;
    }
    loaded();
  }, [message, validateMessage])
  /* eslint-disable */

  useOnInitialized(() => {
    setInputValidation({ name: "", email: "", phone: "", message: "", error: false });
  }, [])

  const submit = () => {
  };

  return (
    <div className="contact-content">
      <p className="text-center contact-title fade-in">Contact Us</p>
      <div className="contact-form fade-in">
        <ContactForm inputValidation={inputValidation} setInputValidation={setInputValidation} name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} />
        <CustomTextArea inputId={'message'} active={message !== ""} error={inputValidation.message} onChange={setMessage} />
        <br />
        <div className="form-button fade-in">
          <button onClick={submit} className="btn" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
