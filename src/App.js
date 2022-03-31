import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import PostCard from "./components/PostCard"
import PostForm from "./components/PostForm"
import PostsContainer from "./containers/PostsContainer"

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Header slogan="Start typing away!" storename="The world's finest blog!"/>
        <Switch>
          <Route path="/posts/new">
            <PostForm />
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
