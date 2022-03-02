import React from "react";
import Toast from "../shared/toast/toast";
import checkIcon from '../../images/assets/check.svg';
import errorIcon from '../../images/assets/error.svg';
import infoIcon from '../../images/assets/info.svg';
import warningIcon from '../../images/assets/warning.svg';


export default function Treatments() {
  const testList = [
    {
      id: 1,
      title: 'Success',
      description: 'This is a success toast component',
      backgroundColor: '#5cb85c',
      icon: checkIcon
    },
    {
      id: 2,
      title: 'Info',
      description: 'This is an info toast component',
      backgroundColor: '#5bc0de',
      icon: infoIcon
    },
    {
      id: 3,
      title: 'Warning',
      description: 'This is a warning toast component',
      backgroundColor: '#f0ad4e',
      icon: warningIcon
    },
    {
      id: 4,
      title: 'Error',
      description: 'This is an error toast component',
      backgroundColor: '#d9534f',
      icon: errorIcon
    },
  ];
  return (
    <>
      <h3>Treatments</h3>
      <Toast
        autoDelete={true}
        autoDeleteTime={2000}
        toastList={testList}
        position="bottom-right"
      />
    </>
  )
}