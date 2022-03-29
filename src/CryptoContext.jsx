// * ========== IMPORTS ==========

import React, { createContext, useContext, useEffect, useState } from "react";


// * ========== VARIABLES & FUNCTIONS ==========

// create Context, save it to a variable
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === 'USD') setSymbol('$')
  }, [currency]);

  // Basically returns our State to all of the children, all children will receive it because we wrapped our app in index.js with this component
  return <Crypto.Provider value={{currency,symbol,setCurrency}} >{children}</Crypto.Provider>;
};

export default CryptoContext;

// to export our state to all of our app we make use of useContext hook
export const CryptoState = () => {
    return useContext(Crypto);
};
