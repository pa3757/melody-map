import React, { createContext, useContext, useState, useEffect } from "react";

const TestContext = createContext();

export const useTest = () => useContext(TestContext);

export const TestProvider = ({ children }) => {
  const [choice, setChoice] = useState(() => {
    const savedChoice = sessionStorage.getItem("choice");
    return savedChoice || "";
  });

  const addSelection = (selection) => {
    setChoice((prev) => {
      const newChoice = prev + selection;
      sessionStorage.setItem("choice", newChoice);
      return newChoice;
    });
  };

  const resetChoice = () => {
    setChoice("");
    sessionStorage.removeItem("choice");
  };

  return (
    <TestContext.Provider value={{ choice, addSelection, resetChoice }}>
      {children}
    </TestContext.Provider>
  );
};
