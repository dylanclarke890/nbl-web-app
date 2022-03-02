import React from "react";
import Toast from "../shared/toast/toast";
import createToast from "../shared/toast/toast-helper";

export default function Treatments() {
  const list = [];
  list.push(createToast("warning", "warning"));

  return (
    <>
      <h3>Treatments</h3>
      <Toast autoDelete={true} autoDeleteTime={10000} toastList={list} position={'top-right'} />
    </>
  )
}