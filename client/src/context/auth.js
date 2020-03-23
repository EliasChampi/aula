import React, { useState, createContext, useEffect } from 'react'
import cache from 'helpers/cache';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    useEffect(() => {
      if (cache.hasThis('user')){
          setUser(cache.getItem('user'));
      }
    }, [])
    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            isAuthed: Object.keys(user).length > 0 && user.accessToken !== ""
        }}>
            {children}
        </AuthContext.Provider>
    )
}