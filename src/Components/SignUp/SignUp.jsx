import { useState } from 'react'
import './SignUp.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Navigate, Link } from 'react-router-dom'




const NETFLIX_LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'

function SignUp() {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[name, setName] = useState('')
    const[loading, setLoading] = useState('')
    const [error, setError] = useState('')
    const { register,isAuthenticated } = useAuth()
    const navigate = useNavigate()

    if( isAuthenticated ){
        return <Navigate to="/" replace />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const result = await register(name.trim(), email.trim(), password)
        if(result.success){
            navigate('/login', { replace: true })
        }
        else {
            console.log(result)
            setError(result.error)
        }
        setLoading(false)
    }

  return (
    <div className="register">
      <img className="register__logo" src={NETFLIX_LOGO} alt="Netflix" />
      <form className="register__form" onSubmit={handleSubmit}>
        <h1 className="register__title">Register</h1>
        {error && <p className="register__error">{error}</p>}

        <input
          type="name"
          className="register__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          className="register__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="register__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password" name='password'
          required
        />  
        <button type="submit" className="register__button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign Up'}
        </button>
        <p className='login-click'>Already an Netflix account? <Link to="/login" className='link-click'>Sign in.</Link></p>
      </form>
    </div>
  )
}

export default SignUp