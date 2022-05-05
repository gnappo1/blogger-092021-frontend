import {useEffect, useContext} from 'react'
import {UserContext} from '../context/user'
import {MessageContext} from '../context/message'
import {useHistory} from "react-router-dom"

const Signout = () => {
    const {signout} = useContext(UserContext);
    const {setMessage} = useContext(MessageContext);
    const history = useHistory()

    useEffect(() => {
        const handleSignout = async () => {
            const didItWork = await signout()
            if (didItWork) {
                setMessage({message: "Successfully signed out", color: "green"})
                history.push("/signin")
            }
        }
        handleSignout()
    }, [signout, history, setMessage]);

    return (
        <div>Loading...</div>
    )
}

export default Signout