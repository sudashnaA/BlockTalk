import { createContext } from "react";

interface AuthInterface {
    Auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthInterface>({Auth: false, setAuth: () => void 0});