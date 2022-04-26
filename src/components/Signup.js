import { useState, useContext } from 'react'
import {UserContext} from "../context/user"
import {useHistory, Redirect} from "react-router-dom"

const Signup = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    email: '',
    passwordConfirmation: ''
  })
  const history = useHistory()
  const {createAccount, user} = useContext(UserContext);


  const handleChange = ({target: {value, name}}) => {
    setState({
      ...state,
      [name]: value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if ([state.email, state.username, state.password, state.passwordConfirmation].some(val => val.trim() === "")) {
        alert("You must fill in all the information please!")
    }
    const resp = await createAccount({username: state.username, email: state.email, password: state.password, password_confirmation: state.passwordConfirmation})
    if (resp) history.push("/profile")
  }

  if (user) <Redirect to="/profile" />

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={ state.username } onChange={ handleChange } required/>
        </div><br />
        <div>
          <label htmlFor="email">Email: </label>
          <input type="text" id="email" name="email" value={ state.email } onChange={ handleChange } required/>
        </div><br />
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" value={ state.password } onChange={ handleChange } required/>
        </div><br />
        <div>
          <label htmlFor="password-confirmation">Password Confirmation: </label>
          <input type="password" id="password-confirmation" name="passwordConfirmation" value={ state.passwordConfirmation } onChange={ handleChange } required/>
        </div><br />
        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}

export default Signup