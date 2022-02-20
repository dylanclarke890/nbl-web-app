import React from 'react'

import * as Validation from '../../../helpers/validation'
import CustomInput from "./custom-input";

interface formValidation {
  name: string,
  phone: string,
  email: string,
  error: Boolean
}

interface IContactForm {
  inputValidation: any,
  setInputValidation: any,
  name: string,
  setName: any,
  email: string,
  setEmail: any,
  phone: string,
  setPhone: any
}

export default function ContactForm({ inputValidation, setInputValidation, name, setName, email, setEmail, phone, setPhone }: IContactForm) {

  const handleNumberKeyPress = (e: KeyboardEvent) => {
    if (e.key !== "+" && !Validation.isNumber(e.key)) {
      e.preventDefault();
    }
  };

  const emptyKeyBoardEventHandler = (e: KeyboardEvent) => { };

  function validateName(): void {
    if (!name) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "Must provide a name. (3 - 30 characters).",
        error: true
      }));
    } else if (name.length < 3) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "Name must be between 3 and 30 characters.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "",
        error: false
      }));
    }
  }

  const nameChanged = (e: string) => {
    setName(e);
    validateName();
  }

  function validateEmail(): void {
    if (!email) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "Must provide an email address.",
        error: true
      }));
    } else if (email && !Validation.validateEmail(email)) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "Must provide a valid email address.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "",
        error: false
      }));
    }
  }

  const emailChanged = (e: string) => {
    setEmail(e);
    validateEmail();
  }

  function validatePhone(): void {
    if (!phone) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        phone: "Must provide a phone number.",
        error: true
      }));
    }
    if (phone && !Validation.validatePhone(phone)) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        phone: "Must provide a valid number.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        phone: "",
        error: false
      }));
    }
  }

  const phoneChanged = (e: string) => {
    setPhone(e);
    validatePhone();
  }

  return (
    <>
      <CustomInput inputId={"name"}
        active={name !== ""}
        error={inputValidation.name}
        onChange={nameChanged}
        onKeyPress={emptyKeyBoardEventHandler}
      />
      <CustomInput inputId={"phone"}
        active={phone !== ""}
        error={inputValidation.phone}
        onChange={phoneChanged}
        onKeyPress={handleNumberKeyPress}
      />
      <CustomInput inputId={"email"}
        active={email !== ""}
        error={inputValidation.email}
        onChange={emailChanged}
        onKeyPress={emptyKeyBoardEventHandler}
      />
    </>
  )
}