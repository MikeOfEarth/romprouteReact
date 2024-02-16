import { createContext, useState } from "react";

const QueryContext = createContext()

export default function QueryProvider({ children }) {

    const [queryList, setQueryList] = useState([])
    const [sendQuery, setSendQuery] = useState([])
    const [searchLocation, setSearchLocation] = useState('')

    function updateQueryList(placeData) {
        console.log(placeData)
        setQueryList([...queryList,{placeData}])
    }

    function updateSendQuery(data) {
        console.log(data)
        setSendQuery([...sendQuery,data])
    }

    const values = {
        queryList,
        setQueryList,
        updateQueryList,

        sendQuery,
        updateSendQuery,
        setSendQuery,

        searchLocation,
        setSearchLocation
    }

    return (
        <QueryContext.Provider value={values}>
            {children}
        </QueryContext.Provider>
    )
}

export {
    QueryContext
}