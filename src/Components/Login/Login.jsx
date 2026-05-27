import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate, Navigate } from 'react-router-dom'
import './Login.css'

const NETFLIX_LOGO =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(email.trim(), password)
    if (result.success) {
      navigate('/', { replace: true })
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div className="login">
      <img className="login__logo" src={NETFLIX_LOGO} alt="Netflix" />
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Sign In</h1>
        {error && <p className="login__error">{error}</p>}

        <input
          type="email"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" className="login__button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Login
