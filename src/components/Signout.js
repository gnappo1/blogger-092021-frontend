import {useEffect, useContext} from 'react'
import {UserContext} from '../context/user'
import {useHistory} from "react-router-dom"

const Signout = () => {
    const {signout} = useContext(UserContext);
    const history = useHistory()

    useEffect(() => {
        const handleSignout = async () => {
            const didItWork = await signout()
            if (didItWork) {
                history.push("/signin")
            }
        }
        handleSignout()
    }, [signout, history]);

    return (
        <div>Loading...</div>
    )
}

export default Signout