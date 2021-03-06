import React, { useState } from "react";
import { useReducer } from "react";

import { LoadingContext } from "../../../../contexts/loading-context/loading-context";
import IChildren from "../../../../interfaces/IChildren";
import LoadingSpinner from "../loading-spinner/loading-spinner";

export default function LoadingController({ children }: IChildren) {
  const [loading, setLoading] = useReducer((state) => !state, false);
  const [loadingText, setLoadingText] = useState("");

  const isLoading = (displayText?: string) => {
    setLoading();
    setLoadingText(displayText ? displayText : "Loading...");
  }
  const loaded = () => {
    setLoading();
    setLoadingText("");
  }

  const providerVal = { loading, isLoading, loaded };
  return (
    <>
      {loading ? <LoadingSpinner loadingText={loadingText} /> : null}
      <LoadingContext.Provider value={providerVal}>
        {children}
      </LoadingContext.Provider>
    </>
  )
}