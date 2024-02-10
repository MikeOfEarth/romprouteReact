import { createContext, useState } from "react";

const UserContext = createContext()

export default function UserProvider({ children }) {

    const [user, setUser] = useState({ username: '', token: ''})

    function updateUser({ username, token}) {
        console.log(token.concat('from update user function'))        
        setUser({ username, token})
    }

    function logoutUser(){
        setUser({})
    }

    const values = {
        user,
        updateUser,
        logoutUser,
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext
}