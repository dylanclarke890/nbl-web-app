import { useEffect, useRef } from "react";

/* eslint-disable */
export default function useOnInitialized(callback: any, inputs: any) {
  const firstRender = useRef(false);

  useEffect(() => {
    if (!firstRender.current) { 
      return callback();
    }
    firstRender.current = true;
  }, inputs);
}