import React, { createContext, useState, useContext } from "react";

export const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [music, setMusic] = useState(null);
  const [place, setPlace] = useState(null);

  return (
    <DataContext.Provider value={{ music, setMusic, place, setPlace }}>
      {children}
    </DataContext.Provider>
  );
};
