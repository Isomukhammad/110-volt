import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [type, setType] = useState(null);
    const [message, setMessage] = useState(null);
    const handleShowToast = (type, message) => {
        switch (type) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.error(message);
                break;
            case "warning":
                toast.warning(message);
                break;
            case "info":
                toast.info(message);
                break;
            default:
                return null;
        }
    }

    const values = {
        type,
        setType,
        message,
        setMessage,
        handleShowToast,
    }
    return (
        <ToastContext.Provider value={values}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);