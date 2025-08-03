import { createContext, useContext, useState, ReactNode } from "react";

// ✅ Define the TypeScript interface for the context
interface CountContextProps {
    count: number;
    increment: () => void;
    decrement: () => void;
}

// ✅ Create context with the defined interface
export const CountContext = createContext<CountContextProps | undefined>(undefined);

export const CountProvider = ({ children }: { children: ReactNode }) => {
    const [count, setCount] = useState<number>(0);

    // ✅ Functions defined as void return types
    const increment = (): void => setCount((count) => count + 1);
    const decrement = (): void => setCount((count) => (count > 0 ? count - 1 : 0));

    return (
        <CountContext.Provider value={{ count, increment, decrement }}>
            {children}
        </CountContext.Provider>
    );
};

// ✅ Custom hook to use the context
export const useCount = () => {
    const context = useContext(CountContext);

    if (!context) {
        throw new Error("useCount must be used within a CountProvider");
    }

    return context;
};
