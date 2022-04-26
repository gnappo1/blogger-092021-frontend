import { useState, useContext } from 'react'
import {UserContext} from "../context/user"

const Login = () => {
  const [state, setState] = useState({
    username: '',
    password: ''
  })
  const {login} = useContext(UserContext);

  const handleChange = ({target: {value, name}}) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    login(state)
  }

  const handleGoogleLogin = () => {
    fetch('/api/v1/auth/google_oauth2')
    .then(res => res.json())
    .then(data => {debugger})
}

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={ state.username } onChange={ handleChange } />
        </div><br />
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" value={ state.password } onChange={ handleChange } />
        </div><br />
        <input type="submit" value="Login" />
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </form>
    </div>
  )
}

export default Login