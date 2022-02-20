import React from 'react'
import { useCallback, useEffect } from 'react';

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
  const emptyKeyBoardEventHandler = (e: KeyboardEvent) => { };

  const validateName = useCallback((): void => {
    if (!name) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "Must provide a name. (3 - 30 characters).",
        error: true
      }));
    } else if (name.length < 3) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "Must be between 3 and 30 characters.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        name: "",
        error: false
      }));
    }
  }, [name, setInputValidation])

  useEffect(() => {
    validateName();
  }, [name, validateName])

  const validateEmail = useCallback((): void => {
    if (!email) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "Must provide an email.",
        error: true
      }));
    } else if (email && !Validation.validateEmail(email)) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "Must provide a valid email.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        email: "",
        error: false
      }));
    }
  }, [email, setInputValidation])

  useEffect(() => {
    validateEmail();
  }, [email, validateEmail])

  const validatePhone = useCallback((): void => {
    if (!phone) {
      setInputValidation((inputValidation: formValidation) => ({
        ...inputValidation,
        phone: "Must provide a phone number.",
        error: true
      }));
    } else if (phone && !Validation.validatePhone(phone)) {
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
  }, [phone, setInputValidation])

  useEffect(() => {
    validatePhone();
  }, [phone, validatePhone])

  return (
    <>
      <CustomInput inputId={"name"}
        active={name !== ""}
        error={inputValidation.name}
        onChange={setName}
        onKeyPress={emptyKeyBoardEventHandler}
      />
      <CustomInput inputId={"phone"}
        active={phone !== ""}
        error={inputValidation.phone}
        onChange={setPhone}
        onKeyPress={Validation.handleNumberKeyPress}
      />
      <CustomInput inputId={"email"}
        active={email !== ""}
        error={inputValidation.email}
        onChange={setEmail}
        onKeyPress={emptyKeyBoardEventHandler}
      />
    </>
  )
}