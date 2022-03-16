import React, { useEffect } from 'react';

import IToast from './IToast';

import './toast.css';

export default function Toast({ toastList, setToastList, position, autoDelete, autoDeleteTime }: { toastList: IToast[], setToastList: any, position: string, autoDelete: boolean, autoDeleteTime: number }) {

  /* eslint-disable */
  useEffect(() => {
    if (!autoDelete || !toastList.length) return;
    const interval = setInterval(() => {
      if (autoDelete && toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    }
  }, [toastList]);
  /* eslint-enable */

  const deleteToast = (id: number) => {
    const index = toastList.findIndex(e => e.id === id);
    toastList.splice(index, 1);
    setToastList([...toastList]);
  }

  return (
    <>
      <div className={`notification-container ${position}`}>
        {
          toastList.map((toast, i) =>
            <div
              key={i}
              className={`notification toast ${position}`}
              style={{ backgroundColor: toast.backgroundColor }}
            >
              <button onClick={() => deleteToast(toast.id)}>
                X
              </button>
              <div className="notification-image">
                <img src={toast.icon} alt="" />
              </div>
              <div>
                <p className="notification-title">{toast.title}</p>
                <p className="notification-message">
                  {toast.description}
                </p>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}