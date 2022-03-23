import { createContext } from "react";

import IToastContext from "./IToastContext";

export const ToastContext = createContext<IToastContext>(
  { createToast: (toastType: string, description: string) => { } })