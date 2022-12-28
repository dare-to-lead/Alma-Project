import { createContext, useContext, useEffect, useState } from "react";

const Mode = createContext();

const ModeContext = ({children}) => {

    const [currency, setCurrency] = useState('INR')
    const [symbol, setSymbol] = useState('$')

    useEffect(() => {
     if(currency === 'INR' ){
        setSymbol('₹')
     } else if(currency === 'USD') {
        setSymbol('$')
     }
      }, [currency])
    
    return (
        <Mode.Provider value={{currency, symbol, setCurrency}}>
         {children}
        </Mode.Provider>
    )
}  

export default ModeContext;

export const ModeState = () => {
   return useContext(Mode)
}