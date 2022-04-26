import {useContext, useEffect} from 'react'
import {UserContext} from '../context/user'
import {Redirect, Link} from "react-router-dom"
import PostCard from './PostCard'
const Profile = () => {
    const {user} = useContext(UserContext);

    if (!user) return <Redirect to="/login"/>
  return (
    <div>
        <h1>{user.username} Profile</h1>
        <h4>{user.email}</h4>

        My Posts
        <ul>
            {user.posts.length > 0 ? user.posts.map(post => <PostCard post={post} key={post.id} />) : <h4>It looks like you have no posts! Go create one <Link to="/posts/new">here</Link>.</h4>}
        </ul>
    </div>
  )
}

export default Profile