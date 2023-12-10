import React, { createContext, useContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
  const [userSearch, setUserSearch] = useState('');
  return(
    <SearchContext.Provider
    value={{userSearch, setUserSearch}}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = ()=> {
  return useContext(SearchContext);
}