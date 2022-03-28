import React, { useState } from "react";

import { ToastContext } from "../../../contexts/toast-context/toast-context";
import IChildren from "../../../interfaces/IChildren";
import IToast from './IToast'
import Toast from "./toast";

import checkIcon from '../../../images/assets/check.svg';
import errorIcon from '../../../images/assets/error.svg';
import infoIcon from '../../../images/assets/info.svg';
import warningIcon from '../../../images/assets/warning.svg';

export default function ToastController({ children }: IChildren) {
  const [toastList, setToastList] = useState<IToast[]>([]);

  const newToastParams = (title: string, description: string,
    backgroundColor: string, icon: string): IToast => ({
      id: Math.random() * 100,
      title: title,
      description: description,
      backgroundColor: backgroundColor,
      icon: icon
    })

  const createToast = (toastType: string, description: string) => {
    let toast: IToast | null = null;
    switch (toastType.toLowerCase()) {
      case "warning":
        toast = newToastParams('Warning', description, '#f0ad4e', warningIcon);
        break;
      case "error":
        toast = newToastParams('Error', description, '#d9534f', errorIcon);
        break;
      case "info":
        toast = newToastParams('Info', description, '#5bc0de', infoIcon);
        break;
      case "success":
        toast = newToastParams('Success', description, '#5cb85c', checkIcon);
        break;
      default:
        toast = newToastParams('Error', '', '#d9534f', errorIcon);
        break;
    };
    setToastList(curr => [...curr, toast!]);
  }

  const providerVal = { createToast };
  return (
    <>
      <ToastContext.Provider value={providerVal}>
        <Toast toastList={toastList} setToastList={setToastList}
          position="top-right" autoDelete autoDeleteTime={2000} />
        {children}
      </ToastContext.Provider>
    </>
  )
}