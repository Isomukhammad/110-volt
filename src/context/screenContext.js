import { createContext, useContext, useEffect, useState } from "react";

export const ScreenContext = createContext(null);

const ScreenProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDekstop] = useState(false);

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsMobile(true)
        } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setIsTablet(true)
        } else if (window.innerWidth >= 1024) {
            setIsDekstop(true);
        } else {
            setIsMobile(false)
            setIsTablet(false)
            setIsDekstop(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        }

        if (window.innerWidth >= 768 && window.innerWidth < 1024) {
            setIsTablet(true);
        }

        if (window.innerWidth >= 1024) {
            setIsDekstop(true);
        }
    }, [])

    const values = {
        isMobile,
        isTablet,
        isDesktop
    }

    return (
        <ScreenContext.Provider value={values}>
            {children}
        </ScreenContext.Provider>
    )
}

export default ScreenProvider;

export const useMedia = () => useContext(ScreenContext);