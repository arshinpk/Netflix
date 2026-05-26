import {createContext,useContext,useState,useEffect} from 'react'

const AuthContext = createContext(null)

export default function AuthProvider( {children} ) {
    const [user, setUser] = useState(null)
    useEffect(() => {
        const saved = localStorage.getItem('netflix_user')
        if (!saved) return
        try {
            setUser(JSON.parse(saved))
        } catch {
            localStorage.removeItem('netflix_user')
        }
    }, [])

    const login = (email, password) => {
        const trimmedEmail = email?.trim()
        if (!trimmedEmail || password.length < 6) {
            return { success: false, error: 'Invalid email or password' }
        }
        const userData = { email: trimmedEmail, name: trimmedEmail.split('@')[0] }
        setUser(userData)
        localStorage.setItem('netflix_user',JSON.stringify(userData))
        return {success:true}
    }
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('netflix_user')
    }

    const isAuthenticated = !!user // (!! converts any value into a true boolean (true or false)).
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