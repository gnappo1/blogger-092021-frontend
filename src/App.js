import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import PostCard from "./components/PostCard"
import Notification from "./components/Notification"
import PostForm from "./components/PostForm"
import PostsContainer from "./containers/PostsContainer"
import {useEffect, useContext} from "react"
import CommentsList from './components/CommentsList';
import {UserContext} from "./context/user"
import Signin2 from './components/Signin2';
import Signup from './components/Signup';
import Signout from './components/Signout';
import Profile from './components/Profile';

function App() {
  const {getCurrentUser} = useContext(UserContext)

  useEffect(() => {
      getCurrentUser()
  }, [])

  return (
    <div className="App">
      <Router>
        <Notification/>
        <Navbar />
        <Header slogan="Start typing away!" storename="The world's finest blog!"/>
        <Switch>
          <Route path="/posts/new">
            <PostForm />
          </Route>
          <Route path="/posts/:postId/comments">
            <CommentsList />
          </Route>
          <Route path="/posts/:id">
            <PostCard />
          </Route>
          <Route path="/posts">
            <PostsContainer />
          </Route>
          <Route path="/signin">
            <Signin2 />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/signout">
            <Signout />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
