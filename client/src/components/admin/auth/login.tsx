import React, { useCallback, useContext, useState } from "react";
import { LoadingContext } from "../../../contexts/loading-context/loading-context";
import { ToastContext } from "../../../contexts/toast-context/toast-context";
import { login } from "../../../services/authService";
import CustomInput from "../../shared/input/custom-input/custom-input";

export default function Login() {
  const { createToast } = useContext(ToastContext);
  const { loading, isLoading, loaded } = useContext(LoadingContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const validateFields = () => {
    let valid = true;
    if (!email) {
      setEmailErrMsg("Email is required.");
      valid = false;
    } else setEmailErrMsg("");
    if (!password) {
      setPasswordErrMsg("Password fields required and must match.");
      valid = false;
    } else setPasswordErrMsg("");
    return valid;
  }

  /* eslint-disable */
  const onError = useCallback(() => createToast("error", "Error occured during registration."), []);
  /* eslint-enable */
  const submit = async () => {
    const valid = validateFields();
    if (loading || !valid) return;
    isLoading();
    const res = await login({ email, password })
      .catch(onError);
    if (res) window.location.href = "/admin";
    loaded();
  }

  return (
    <>
      <div className="sign-form">
        <h2 className="title text-center">Login</h2>
        <CustomInput inputId="email" error={emailErrMsg} active={email !== ""} onChange={setEmail} />
        <CustomInput inputId="password" error={passwordErrMsg} active={password !== ""} onChange={setPassword} />
        <div className="flex justify-center">
          <button className="btn" onClick={submit}>Login</button>
        </div>
      </div>
    </>
  )
}