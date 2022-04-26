import {useState, useEffect} from 'react'
import PostsList from "../components/PostsList"
const PostsContainer = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/v1/posts")
        .then(r => {
          if (r.ok) {
            r.json()
            .then(data => {
              const formattedPosts = data.data.map(post => {
                return {...post.attributes, comments: post.attributes.comments.data.map(c => c.attributes)}
              })
              setPosts(formattedPosts)
            })
          } else {
            r.json()
            .then(errorObj => alert(errorObj.error))
          }
        })
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