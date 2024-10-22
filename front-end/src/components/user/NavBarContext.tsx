import { createContext, useState, ReactNode } from 'react';

// Define the type for the context
interface NavBarContextType {
    data: string;
    setData: (value: string) => void;
    setSearchValue: (value: string) => void;
    searchValue: string;
    userId: string,
    setUserId: (value: string) => void;
}

// Create the context
export const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

// Provider component
export const NavBarProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    return (
        <NavBarContext.Provider value={{ data, setData, searchValue, setSearchValue, userId, setUserId }}>
            {children}
        </NavBarContext.Provider>
    );
};
