import React, { createContext, useState, useEffect } from 'react'
import authService from '../../services/auth/auth'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const fetchUserData = () => {
        authService.isAuthenticated()
            .then(data => {
                setUser(data.user)
                setIsAuthenticated(data.isAuthenticated)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }


    useEffect(fetchUserData, [])
    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, fetchUserData }}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )
}
export default AuthProvider