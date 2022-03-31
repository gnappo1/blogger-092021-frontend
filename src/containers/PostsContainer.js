import {useState, useEffect} from 'react'
import PostsList from "../components/PostsList"
const PostsContainer = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/posts")
        .then(r => r.json())
        .then(data => setPosts(data))
        .catch(err => alert(err))  
    }, []);

  return (
    <div>
        <h2>Posts</h2>
        <PostsList posts={posts} />
    </div>
  )
}

export default PostsContainer