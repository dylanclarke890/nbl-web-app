import React, { useState } from "react";
import CustomInput from "../shared/input/custom-input.tsx";
import CustomTextArea from "../shared/input/custom-textarea.tsx";

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
        <CustomInput inputId={'name'} active={nameActive} error={inputValidation.name} onChange={updateName} />
        <CustomInput inputId={'phone'} active={numberActive} error={inputValidation.number} onChange={updateNumber} onKeyPress={handleNumberKeyPress} />
        <CustomInput inputId={'email'} active={emailActive} error={inputValidation.email} onChange={updateEmail} />
        <CustomTextArea inputId={'message'} active={messageActive} error={inputValidation.message} onChange={updateMessage} />
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
