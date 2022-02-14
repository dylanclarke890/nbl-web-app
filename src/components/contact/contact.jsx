import React, { useState } from "react";
import "./contact.css";

export default function Contact() {
  const [inputValidation, setInputValidation] = useState({
    general: "",
    name: "",
    email: "",
    number: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [nameActive, setNameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [numberActive, setNumberActive] = useState(false);
  const [messageActive, setMessageActive] = useState(false);

  const updateName = (n) => {
    setNameActive(n);
    setName(n);
  };

  const isNumber = (n) => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    console.log(nums.includes(n));
    return nums.includes(parseInt(n));
  };

  const handleNumberKeyPress = (e) => {
    if (e.key !== "+" && !isNumber(e.key)) {
      e.preventDefault();
    }
  };

  const updateNumber = (n) => {
    setNumberActive(n);
    setNumber(n);
  };
  const updateEmail = (n) => {
    setEmailActive(n);
    setEmail(n);
  };
  const updateMessage = (n) => {
    setMessageActive(n);
    setMessage(n);
  };

  const validateEmail = (email) => {
    let regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  };
  const validateNumber = (num) => {
    const allNums = (val) => /^\d+$/.test(val);

    if (
      !(
        (num[0] === "0" && allNums(num)) ||
        (num[0] === "+" && allNums(num.substring(1, num.length)))
      )
    ) {
      return false;
    }

    // 07946792581
    // +447946792581
    if (num[0] === "0" && num.length !== 11) {
      return false;
    }

    if (num[0] === "+" && num.length !== 13) {
      return false;
    }

    return true;
  };

  const validate = () => {
    let error = false;
    if (!name) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        name: "Name is required (3 - 30 characters).",
      }));
      error = true;
    } else if (name < 3) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        name: "Name must be between 3 and 30 characters.",
      }));
    } else {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        name: "",
      }));
    }

    if (email && !validateEmail(email)) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        email: "Must provide a valid email address.",
      }));
      error = true;
    } else {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        email: "",
      }));
    }

    if (number && !validateNumber(number)) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        number: "Must provide a valid number.",
      }));
      error = true;
    } else {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        number: "",
      }));
    }

    if (!email && !number) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        number: "Must provide an email or phone number.",
        email: "Must provide an email or phone number.",
      }));
      error = true;
    }

    if (!message) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "Must provide a message.",
      }));
    } else if (message.length < 10 || message.length > 300) {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "Message must be between 10 and 300 characters.",
      }));
    } else {
      setInputValidation((inputValidation) => ({
        ...inputValidation,
        message: "",
      }));
    }

    if (error) {
      return false;
    }
    setInputValidation((inputValidation) => ({
      ...inputValidation,
      email: "",
      number: "",
    }));
    return true;
  };

  const submit = () => {
    if (!validate()) {
      return;
    }
  };
  return (
    <div className="contact-content">
      <p className="text-center contact-title">Contact Us</p>
      <div className="contact-form">
        <div className="custom-contact-field">
          <input
            id="name-field"
            type="text"
            placeholder="&nbsp;"
            onChange={(e) => updateName(e.currentTarget.value)}
          />
          <label
            htmlFor="name-field"
            className={nameActive ? "contact-placeholder has-content" : "contact-placeholder"}
          >
            Enter Name
          </label>
          <span className="error-message" aria-live="polite">
            {inputValidation.name}
          </span>
        </div>
        <div className="custom-contact-field">
          <input
            id="phone-field"
            type="text"
            placeholder="&nbsp;"
            onKeyPress={handleNumberKeyPress}
            onChange={(e) => updateNumber(e.currentTarget.value)}
          />
          <label
            htmlFor="phone-field"
            className={numberActive ? "contact-placeholder has-content" : "contact-placeholder"}
          >
            Enter Number
          </label>
          <span className="error-message" aria-live="polite">
            {inputValidation.number}
          </span>
        </div>
        <div className="custom-contact-field">
          <input
            id="email-field"
            type="text"
            placeholder="&nbsp;"
            onChange={(e) => updateEmail(e.currentTarget.value)}
          />
          <label
            htmlFor="email-field"
            className={emailActive ? "contact-placeholder has-content" : "contact-placeholder"}
          >
            Enter Email
          </label>
          <span className="error-message" aria-live="polite">
            {inputValidation.email}
          </span>
        </div>
        <div className="custom-contact-field">
          <textarea
            id="message-field"
            placeholder="&nbsp;"
            onChange={(e) => updateMessage(e.currentTarget.value)}
          />
          <label
            htmlFor="message-field"
            className={
              messageActive ? "contact-placeholder has-content" : "contact-placeholder"
            }
          >
            Enter Message
          </label>
          <span className="error-message" aria-live="polite">
            {inputValidation.message}
          </span>
        </div>
        <br/>
        <div className="form-button">
          <button onClick={submit} className="contact-btn" type="button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
