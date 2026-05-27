import { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { expressUrl } from '../Constants/Constants'

const AuthContext = createContext(null)

function getStoredAuth() {
    try {
        const savedUser = localStorage.getItem('netflix_user')
        const savedToken = localStorage.getItem('netflix_token')
        if (!savedUser || !savedToken) {
            return { user: null, token: null }
        }
        return {
            user: JSON.parse(savedUser),
            token: savedToken,
        }
    } catch {
        localStorage.removeItem('netflix_user')
        localStorage.removeItem('netflix_token')
        return { user: null, token: null }
    }
}

export default function AuthProvider({ children }) {
    const initialAuth = getStoredAuth()
    const [user, setUser] = useState(initialAuth.user)
    const [token, setToken] = useState(initialAuth.token)

    const login = async (email, password) => {
        const trimmedEmail = email?.trim()
        if (!trimmedEmail || !password || password.length < 6) {
            return { success: false, error: 'Invalid email or password' }
        }
        try {
            const {data} = await axios.post(`${expressUrl}/api/auth/login`,{
                email : trimmedEmail,
                password : password
            }) 
            
            if(!data?.status){ 
                return {success: false, error:data.message}
            }

            const userData = {
                id: data?.existingUser?._id,
                name: data?.existingUser?.name,
                email: data?.existingUser?.email,
            }

            if(!data?.token || !userData.email){
                return {success: false, error:"Please try again!"}
            }
            setUser(userData)
            setToken(data.token)
            localStorage.setItem('netflix_user', JSON.stringify(userData))
            localStorage.setItem('netflix_token', data.token)

            return {
                success :true
            }

        } catch (err) {
            return {
                success: false,
                error: err?.response?.data?.message || 'Login failed'
            }
        } 
    }
    const logout = ()=>{
        setUser(null)
        setToken(null)
        localStorage.removeItem('netflix_user')
        localStorage.removeItem('netflix_token')
    }

    const isAuthenticated = !!user && !!token // (!! converts any value into a true boolean (true or false)).
    const value = {
        user,
        isAuthenticated,
        login,
        logout
    }
    return ( 
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>  
    )
}


export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}