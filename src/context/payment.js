import { createContext, useState } from "react";

const PaymentContext = createContext({});

export const PaymentProvider = ({ children }) => {
    const [method, setMethod] = useState('immediately');

    const values = {
        method
    }

    return <PaymentContext.Provider value={values}>{children}</PaymentContext.Provider>
}

export default paymentProvider;

