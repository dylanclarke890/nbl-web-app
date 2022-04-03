import React, { useCallback, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { register } from "../../../services/authService";

import CustomInput from "../../shared/input/custom-input/custom-input";
import CheckmarkSvg from "../../shared/svgs/checkmark-svg";

import './sign.css';

export default function Register() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameErrMsg, setNameErrMsg] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");
  const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState("");

  const [currSlide, setCurrSlide] = useState(0);
  const validateFields = () => {
    let valid = true;
    if (!name) {
      setNameErrMsg("Name is required.");
      valid = false;
    } else setNameErrMsg("");
    if (!email) {
      setEmailErrMsg("Email is required.");
      valid = false;
    } else setEmailErrMsg("");
    if (!password || !confirmPassword || password !== confirmPassword) {
      setPasswordErrMsg("Password fields required and must match.");
      setConfirmPasswordErrMsg("Password fields required and must match.");
      valid = false;
    } else {
      setConfirmPasswordErrMsg("");
      setPasswordErrMsg("");
    }
    return valid;
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error occured during registration."), []);
  /* eslint-enable */
  const submit = async () => {
    const valid = validateFields();
    if (loading || !valid) return;
    isLoading();
    const res = await register({ name, email, password })
      .catch(onError);
    console.log(res);
    if (res) setCurrSlide(1);
    loaded();
  }

  return currSlide === 0 ? (
    <>
      <div className="sign-form">
        <h2 className="title text-center">Sign Up</h2>
        <CustomInput inputId="name" error={nameErrMsg} active={name !== ""} onChange={setName} />
        <CustomInput inputId="email" error={emailErrMsg} active={email !== ""} onChange={setEmail} />
        <CustomInput inputId="password" error={passwordErrMsg} active={password !== ""} onChange={setPassword} />
        <CustomInput inputId="confirmPassword" labelText="password again" error={confirmPasswordErrMsg} active={confirmPassword !== ""} onChange={setConfirmPassword} />
        <div className="flex justify-center">
          <button className="btn" onClick={submit}>Submit</button>
        </div>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-center mt-1">Success!</h2>
      <CheckmarkSvg />
      <div className="flex justify-center mt-2">
        <Link className="custom-link" to={"/admin/login"}>Go to Login</Link>
      </div>
    </>
  )
}