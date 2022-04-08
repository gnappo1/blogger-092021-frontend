import {useState, useEffect} from 'react'

const style = {
    backgroundColor: "red",
    fontSize: "bold"
}

const Notification = ({error}) => {
    const [vanishMode, setVanishMode] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setVanishMode(true)
        }, 5000)
        return () => {
            clearTimeout(timer)
            setVanishMode(false)
        };
    }, [error]);

    return (
        <div>
            {!vanishMode ? <p style={style}>{error}</p> : null}
        </div>
    )
}

export default Notification