import {useState, useEffect} from "react"
import {Link, useParams, useLocation, useHistory} from "react-router-dom"
import CommentForm from './CommentForm'
import CommentsList from './CommentsList'
import EditPostForm from "./EditPostForm"

const PostCard = ({post, handleError}) => {
    const {id} = useParams()
    const location = useLocation()
    const [postObj, setPostObj] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [comments, setComments] = useState([]);
    const history = useHistory()
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {   
        if (!post) {
            fetch(`/api/v1/posts/${id}`)
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

    const formatDateTime = (datetime) => {
      const m = new Date(datetime);
      const dateString =
          m.getUTCFullYear() + "/" +
          ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
          ("0" + m.getUTCDate()).slice(-2) + " " +
          ("0" + m.getUTCHours()).slice(-2) + ":" +
          ("0" + m.getUTCMinutes()).slice(-2) + ":" +
          ("0" + m.getUTCSeconds()).slice(-2);
      return dateString;
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
        <h4>Delete Date&Time: {finalPost.delete_time ? formatDateTime(finalPost.delete_time) : "N/A"}</h4>
        {finalPost.mediaUrl ? <img src={finalPost.mediaUrl} alt="Media explanation here" /> : null}
        {location.pathname !== "/posts" ? <>
          <button name="edit-mode" id="edit-btn" onClick={handleClick}>Edit</button>
          <button name="delete" id="delete-btn" onClick={handleClick}>Delete</button>
        </> : null}
        </> : <EditPostForm handleError={handleError} postObj={finalPost} handleUpdate={handleUpdate}/>}
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