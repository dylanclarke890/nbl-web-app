import IToast from "../../../interfaces/IToast";
import checkIcon from '../../../images/assets/check.svg';
import errorIcon from '../../../images/assets/error.svg';
import infoIcon from '../../../images/assets/info.svg';
import warningIcon from '../../../images/assets/warning.svg';

const newToastParams = (title: string, description: string, backgroundColor: string, icon: string): IToast => {
  return {
    id: Math.random() * 100,
    title: title,
    description: description,
    backgroundColor: backgroundColor,
    icon: icon
  }
}

export default function createToast(toastType: string, description:string) {
  switch (toastType.toLowerCase()) {
    case "warning":
      return newToastParams('Warning', description, '#f0ad4e', warningIcon);
    case "error":
      return newToastParams('Error', description, '#d9534f', errorIcon);
    case "info":
      return newToastParams('Info', description, '#5bc0de', infoIcon);
    case "success":
      return newToastParams('Success', description, '#5cb85c', checkIcon);
    default:
      return newToastParams('Error', '', '#d9534f', errorIcon);
  }
}