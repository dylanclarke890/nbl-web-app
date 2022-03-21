import React from "react";

import ILoadingSpinner from "./ILoadingSpinner";

import './loading-spinner.css';

export default function LoadingSpinner({ loadingText }: ILoadingSpinner) {
  return (
    <>
      <div className="loading-spinner-container">
        <div className="h-100 flex flex-column justify-center align-center">
          <div className="loading-spinner">
          </div>
          <p className="text-center title">{loadingText ? loadingText : "Loading..."}</p>
        </div>
      </div>
    </>
  )
}