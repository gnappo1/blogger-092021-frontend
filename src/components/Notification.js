import {useState, useEffect, useContext} from 'react'
import {MessageContext} from '../context/message'
const style = {
    backgroundColor: "red",
    fontSize: "bold"
}

const Notification = () => {
    const [vanishMode, setVanishMode] = useState(false);
    const {message, setMessage} = useContext(MessageContext)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVanishMode(true)
        }, 5000)
        return () => {
            clearTimeout(timer)
            setVanishMode(false)
        };
    }, [message]);

    return (
        <div>
            {!vanishMode ? <p style={style}>{message}</p> : null}
        </div>
    )
}

export default Notification