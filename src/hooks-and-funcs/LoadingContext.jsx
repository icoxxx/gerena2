import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);

    const setLoading = (value)=> {
        setIsLoading(value);
    };

    return(
        <LoadingContext.Provider value={{isLoading, setLoading}}>
            {children}
        </LoadingContext.Provider>
    )
};

export const useLoading = ()=> {
    const context = useContext(LoadingContext);
    if(!context){
        throw new Error('useLoading must be used withing a LoadingProvider')
    }
    return context;
}