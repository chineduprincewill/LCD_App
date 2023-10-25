import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = (props) => {

    const [record, setRecord] = useState(null);

    const refreshRecord = (val) => {
        setRecord(val);
    }

    useEffect(() => {
        
        refreshRecord();
    }, [record])

    return(
        <DataContext.Provider value={{refreshRecord, record, /*updateCount, donationsCount, updatePledge, totalPledge, updatePaid, totalPaid*/}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;