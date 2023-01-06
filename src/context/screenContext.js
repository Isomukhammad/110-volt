import { createContext, useEffect, useState } from "react";

export const ScreenSize = createContext(null);

const ScreenContext = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true)
        } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            setIsTablet(true)
        } else {
            setIsMobile(false)
            setIsTablet(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }

        if (window.innerWidth > 768 && window.innerWidth <= 1024) {
            setIsTablet(true)
        }
    }, [])

    const values = {
        isMobile,
        isTablet
    }

    return (
        <ScreenSize.Provider value={values}>
            {children}
        </ScreenSize.Provider>
    )
}

export default ScreenContext;