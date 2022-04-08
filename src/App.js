import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import PostCard from "./components/PostCard"
import Notification from "./components/Notification"
import PostForm from "./components/PostForm"
import PostsContainer from "./containers/PostsContainer"
import {useState} from "react"

function App() {
  const [error, setError] = useState(null);

  const handleError = (errorMsg) => setError(errorMsg)

  return (
    <div className="App">
      <Router>
        <Notification error={error}/>
        <Navbar />
        <Header slogan="Start typing away!" storename="The world's finest blog!"/>
        <Switch>
          <Route path="/posts/new">
            <PostForm handleError={handleError} />
          </Route>
          <Route path="/posts/:id">
            <PostCard />
          </Route>
          <Route path="/posts">
            <PostsContainer />
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
