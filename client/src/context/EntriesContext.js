
import React, { useState, createContext } from "react";

export const EntriesContext = createContext();

export const EntriesContextProvider = (props) => {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    

    const addEntries = (entry) => {
        setEntries([...entries, entry]);
    };
    return (
        <EntriesContext.Provider
            value={{
                entries,
                setEntries,
                addEntries,
                selectedEntry,
                setSelectedEntry,
            }}
        >
            {props.children}
        </EntriesContext.Provider>
    );
};