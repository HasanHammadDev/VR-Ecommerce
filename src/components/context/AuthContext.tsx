import { createContext, useContext, useState } from 'react';
import { AuthContextType, ProviderProps } from '../../../types/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within a CheckLoginStatus provider');
    }
    return context;
  };

export const AuthProvider: React.FC<ProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );

}
