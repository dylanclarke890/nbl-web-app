import React, { useState, useEffect, useContext } from "react";
import { useCallback } from "react";

import useOnInitialized from "../../custom-hooks/useOnInitialized";
import { LoadingContext } from "../../contexts/loading-context/loading-context";
import { ToastContext } from "../../contexts/toast-context/toast-context";
import { sendContactRequest } from "../../services/contactService";

import ContactForm from "../shared/forms/contact-form/contact-form";
import CustomTextArea from "../shared/input/custom-textarea/custom-textarea";
import MessageConfirmation from "./message-confirmation/message-confirmation";

import "./contact.css";
import TitleAndDesc from "../shared/title-and-desc/title-and-desc";

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

  const [currSlide, setCurrSlide] = useState(0);

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

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error while sending message."), [])
  /* eslint-disable */
  const submit = () => {
    if (loading || inputValidation.error) return;
    const request = { name, email, phone, message };
    const sendRequest = async () => {
      isLoading();
      const res = await sendContactRequest(request);
      if (res) {
        setCurrSlide(1);
      } else {
        onError();
      }
      loaded();
    }
    sendRequest().catch(() => { onError(); loaded(); });
  };

  return <>
    <TitleAndDesc title="Contact us" desc="Got a question? Get in touch!" />
    {currSlide === 0 ? (
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
    ) : (
      <div className="mt-3">
        <MessageConfirmation />
      </div>
    )}
  </>
}
