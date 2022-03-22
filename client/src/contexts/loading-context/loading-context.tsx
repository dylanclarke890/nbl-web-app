import { createContext } from "react";

import ILoadingContext from "./ILoadingContext";

export const LoadingContext = createContext<ILoadingContext>({ loading: false, isLoading: (displayText?: string) => { }, loaded: () => { } });