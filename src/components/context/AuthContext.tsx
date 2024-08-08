import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, ProviderProps } from '../../../types/types';
import { checkTokenValidity } from '../../Utility/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within a CheckLoginStatus provider');
    }
    return context;
  };

  export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedValue = localStorage.getItem('isLoggedIn');
        return storedValue ? JSON.parse(storedValue) : false;
    });

    useEffect(() => {
        // Validate token on component mount
        const validateToken = async () => {
            const isValid = await checkTokenValidity();
            setIsLoggedIn(isValid);
            localStorage.setItem('isLoggedIn', JSON.stringify(isValid));
        };
        validateToken();
    }, []);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};
