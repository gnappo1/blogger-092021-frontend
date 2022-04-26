import React, { useState, useContext, useEffect, useCallback } from "react";
import {useHistory} from "react-router-dom"
import {MessageContext} from "../context/message"

const baseUrl = 'http://localhost:3001/api/v1'
const UserContext = React.createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const {setMessage} = useContext(MessageContext);
  const history = useHistory();

  const getCurrentUser = useCallback(async () => {
    const resp = await fetch('/api/v1/me')
    if (resp.status === 200) {
      const data = await resp.json()
      setUser({...data.data.attributes, posts: data.data.relationships.posts.data})
    } else {
      const errorObj = await resp.json();
      setMessage(errorObj.error)
    }
  }, [setMessage])
  
  useEffect(() => {
    if (!user) {
        getCurrentUser()
    }
}, [user, getCurrentUser]);

  const createAccount = async details => {
      const resp = await fetch('/api/v1/signup', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(details)
        })
        if (resp.status === 201) {
            const data = await resp.json();
            setUser({...data.data.attributes, posts: data.data.relationships.posts.data})
            return true
        } else {
            const errorObj = await resp.json();
            setMessage(errorObj.error)
            return false
        }
  }
  
  const login = async (details) => {
      const resp = await fetch('/api/v1/login', {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          },
          body: JSON.stringify(details)
      })
      const data = await resp.json();
      if (data.status === 200) {
          debugger
          setUser(data.user)
          history.push("/profile")
      } else {
        debugger
          console.log(data);
      }
      console.log(data);
  }
  
  const logout = async () => {
      const resp = await fetch('/api/v1/logout', {
          method: "DELETE",
      })
      const data = await resp.json();
      debugger
      setUser(null)
      // setMessage({message: data.message, status: "success"})
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, login, logout, createAccount, getCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}


export { UserContext, UserProvider };
