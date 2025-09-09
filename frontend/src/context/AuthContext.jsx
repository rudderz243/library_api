// we need the required imports first
import { createContext, useContext, useState } from 'react'

// first we create our little section of memory for remembering if we're logged in
const AuthContext = createContext();

export function AuthProvider({children}) {
    // variable to hold whether authenticated, and a corresponding setter method
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // here we create methods to handle various auth functions
    // for now, all they do is updated our auth state, in the real world they'd handle
    // actual auth.
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        /* here we are providing information from this context file to the rest of the app
        so that we can check auth status anywhere, as well as handle the login/logout functions
        on the corresponding pages */
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>

        </AuthContext.Provider>
    );
};