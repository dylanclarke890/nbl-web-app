import React, { useState, useEffect } from 'react';
import IToast from '../../../interfaces/IToast';

import './toast.css';

export default function Toast({ toastList, position, autoDelete, autoDeleteTime }: { toastList: IToast[], position: string, autoDelete: boolean, autoDeleteTime: number }) {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);
  
  /* eslint-disable */
  useEffect(() => {
    const interval = setInterval(() => {
        if (autoDelete && toastList.length && list.length) {
            deleteToast(toastList[0].id);
        }
    }, autoDeleteTime);
    return () => {
        clearInterval(interval);
    }
}, []);
  /* eslint-enable */
  
  const deleteToast = (id: number) => {
    const index = list.findIndex(e => e.id === id);
    list.splice(index, 1);
    setList([...list]);
  }

  return (
    <>
      <div className={`notification-container ${position}`}>
        {
          list.map((toast, i) =>
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