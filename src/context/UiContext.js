import { createContext, useState } from "react";


export const UIContext = createContext()

export const UIContextProvider = ({children}) => {

    const [active, setActive] = useState({
        toggler1: false,
        toggler2: false
    })

    const [showBtn, setShowBtn] = useState(false)

    const handleToggle = (id) => {
        setActive((prevState) => {
            const newState = { toggler1: false, toggler2: false };
            newState[id] = !prevState[id];
            return newState;
        });
  
    };




    return  (
        <UIContext.Provider value={{
            active,
            showBtn,
            setShowBtn,
            handleToggle,
        }} >
            {children}
        </UIContext.Provider>
    )

}




