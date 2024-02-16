import { createContext, useState } from "react";

const APIContext = createContext()

export default function APIProvider({ children }) {

    const [postPlaces, setPostPlaces] = useState([])

    const values = {
        postPlaces,
        setPostPlaces
    }

    return (
        <APIContext.Provider value={values}>
            {children}
        </APIContext.Provider>
    )
}

export {
    APIContext
}