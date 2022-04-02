import {useState, useEffect} from "react"
import {Link, useParams, useLocation} from "react-router-dom"
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'

const PostCard = ({post}) => {
    const {id} = useParams()
    const location = useLocation()
    const [postObj, setPostObj] = useState(null);
    const [comments, setComments] = useState([]);
    useEffect(() => {   
        if (!post) {
            fetch(`http://localhost:3001/posts/${id}`)
            .then(resp => resp.json())
            .then(post => {
              setPostObj(post)
              setComments(post.comments)
            })
        }
    }, [post, id]);

    const addNewComment = (commentObj) => {
      setComments(currentComments => [commentObj, ...currentComments])
    }

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
        <h3>Title: <Link to={`/posts/${finalPost.id}`}>{finalPost.title}</Link></h3>
        <h4>Content: {finalPost.content.slice(0, 20)}...</h4>
        {finalPost.mediaUrl ? <img src={finalPost.mediaUrl} alt="Media explanation here" /> : null}
        {location.pathname !== "/posts" ? (<>
          <CommentForm addNewComment={addNewComment} postId={finalPost.id} />
          <CommentsList comments={comments} />
        </>) : null }
    </div>
  )
}

export default PostCard