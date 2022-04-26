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
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import {UserContext} from "./context/user"

function App() {
  const {getCurrentUser, user} = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      getCurrentUser()
    }
  }, [user, getCurrentUser]);

  return (
    <div className="App">
      <Router>
        <Notification />
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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile">
            <Profile />
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
