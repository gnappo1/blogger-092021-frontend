import {useEffect, useContext} from 'react'
import {UserContext} from '../context/user'
import {MessageContext} from '../context/message'
import {useHistory} from "react-router-dom"
import { logout } from '../actions/auth'

const Logout = () => {
    const {setUser} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const history = useHistory()

    useEffect(() => {
        logout()
        history.push("/login")
    }, [logout, history]);

    return (
        <div>Loading...</div>
    )
}

export default Logout