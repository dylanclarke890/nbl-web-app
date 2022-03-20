import React from 'react'
import { useCallback, useEffect } from 'react';

import * as Validation from '../../../../helpers/validation'
import IContactForm from './IContactForm';
import IInputValidation from '../../../../interfaces/IInputValidation';
import CustomInput from "../../input/custom-input/custom-input";

export default function ContactForm({ inputValidation, setInputValidation, name, setName, email, setEmail, phone, setPhone }: IContactForm) {
  const validateName = useCallback((): void => {
    if (!name) {
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        name: "Must provide a name. (3 - 30 characters).",
        error: true
      }));
    } else if (name.length < 3) {
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        name: "Must be between 3 and 30 characters.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: IInputValidation) => ({
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
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        email: "Must provide an email.",
        error: true
      }));
    } else if (email && !Validation.validateEmail(email)) {
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        email: "Must provide a valid email.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: IInputValidation) => ({
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
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        phone: "Must provide a phone number.",
        error: true
      }));
    } else if (phone && !Validation.validatePhone(phone)) {
      setInputValidation((inputValidation: IInputValidation) => ({
        ...inputValidation,
        phone: "Must provide a valid number.",
        error: true
      }));
    } else {
      setInputValidation((inputValidation: IInputValidation) => ({
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
      />
      <CustomInput inputId={"phone"}
        active={phone !== ""}
        error={inputValidation.phone}
        onChange={setPhone}
        onKeyPress={Validation.handlePhoneNumberKeyPress}
      />
      <CustomInput inputId={"email"}
        active={email !== ""}
        error={inputValidation.email}
        onChange={setEmail}
      />
    </>
  )
}