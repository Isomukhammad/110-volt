import { createContext, useEffect, useState } from "react";

export const ScreenSize = createContext(null);

const ScreenContext = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false)

    //choose the screen size 
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        }
    }, [])

    return (
        <ScreenSize.Provider value={isMobile}>
            {children}
        </ScreenSize.Provider>
    )
}

export default ScreenContext;