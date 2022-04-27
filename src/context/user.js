import React, {useState, useContext, useEffect, useCallback} from "react"
import {useHistory} from "react-router-dom"
import {MessageContext} from "../context/message"

// const baseUrl = "http://localhost:3001/api/v1"
const UserContext = React.createContext()

function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const history = useHistory();
    const {setMessage} = useContext(MessageContext)

    const getCurrentUser = useCallback(async () => { 
        try {
            const resp = await fetch("/api/v1/me")
             if (resp.status === 200) {
                    const data = await resp.json()
                    setUser({...data.data.attributes, posts: data.data.relationships.posts.data})
             } else {
                const errorObj = await resp.json()
                setMessage(errorObj.error)
             }
        } catch (e) {
            setMessage(e.message)
        }
    }, [setMessage])

    const login = async (userInfo) => {
        try {
            debugger
            const resp = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            if (resp.status === 202) {
                const data = await resp.json()
                setUser({...data.data.attributes, posts: data.data.relationships.posts.data})
                return true
            } else {
                const errorObj = await resp.json()
                setMessage(errorObj.error)
                return false
            }

        } catch(e) {
            setMessage(e.message)
        }
    }
    const signup = async (userInfo) => {
        try {
            const resp = await fetch("/api/v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(userInfo)
            })
            if (resp.status === 201) {
                const data = await resp.json()
                debugger
                setUser(data)
                history.push("/profile")
            } else {
                debugger
                const errorObj = await resp.json()
                setMessage(errorObj.error)
            }

        } catch(e) {
            setMessage(e.message)
        }
    }
    const signout = async () => { 
        try {
            const resp = await fetch("/api/v1/logout", {
                method: "DELETE"
            })
            debugger
            setUser(null)
            history.push("/login")
        } catch(e) {
            setMessage(e.message)
        }
    }

    return (
        <UserContext.Provider value={{user, setUser,  getCurrentUser, login, signup, signout}}>
            {children}
        </UserContext.Provider>
    )

}

export {UserContext, UserProvider}