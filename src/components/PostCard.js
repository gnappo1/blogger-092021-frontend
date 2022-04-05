import {useState, useEffect} from "react"
import {Link, useParams, useLocation, useHistory} from "react-router-dom"
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'
import EditPostForm from "./EditPostForm"

const PostCard = ({post}) => {
    const {id} = useParams()
    const location = useLocation()
    const [postObj, setPostObj] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [comments, setComments] = useState([]);
    const history = useHistory()

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

    const handleUpdate = (updatedPostObj) => {
      // e.preventDefault()
      setEditMode(false)
      setPostObj(updatedPostObj)

    }
    const handleClick = (e) => { 
      if (e.target.name === "delete") {
        fetch(`http://localhost:3001/posts/${postObj.id}`, {    method: "DELETE"
        })
        .then(() => history.push("/posts"))
      } else {
        setEditMode(true)
      }
     }

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
      {!editMode ? <>
        <h3>Title: <Link to={`/posts/${finalPost.id}`}>{finalPost.title}</Link></h3>
        <h4>Content: {location.pathname !== "/posts" ? finalPost.content : `${finalPost.content.slice(0, 20)}...`}</h4>
        {finalPost.mediaUrl ? <img src={finalPost.mediaUrl} alt="Media explanation here" /> : null}
        {location.pathname !== "/posts" ? <>
          <button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit</button>
          <button name="delete" id="delete-btn" onClick={handleClick}>Delete</button>
        </> : null}
        </> : <EditPostForm postObj={finalPost} handleUpdate={handleUpdate}/>}
        <hr />
        <hr />
        {location.pathname !== "/posts" ? (<>
          <CommentForm addNewComment={addNewComment} postId={finalPost.id} />
          <br />
        <hr />
        <hr />
          <CommentsList comments={comments} />
        </>) : null }
    </div>
  )
}

export default PostCard