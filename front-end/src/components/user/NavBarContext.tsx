import { createContext, useState, ReactNode } from 'react';

// Define the type for the context
interface NavBarContextType {
    data: string;
    setData: (value: string) => void;
}

// Create the context
export const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

// Provider component
export const NavBarProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<string>("");
    return (
        <NavBarContext.Provider value={{ data, setData }}>
            {children}
        </NavBarContext.Provider>
    );
};
