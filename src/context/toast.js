import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const handleShowToast = (toastType, message) => {
        switch (toastType) {
            case "success":
                toast.success(message);
                break;
            case "error":
                toast.success(message);
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
        handleShowToast
    }
    return (
        <ToastContext.Provider value={values}>
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => useContext(ToastContext);
// import { createContext, useContext, useState } from "react"

// const ToastContext = createContext({})

// export const ToastProvider = ({ children }) => {
//     const [showToast, setShowToast] = useState(false);

//     const values = {
//         showToast,
//     }

//     return <ToastContext.Provider value={values}>{children}</ToastContext.Provider>
// }

// export const useToast = () => useContext(ToastContext);