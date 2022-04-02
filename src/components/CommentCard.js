import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"

const CommentCard = ({comment}) => {
    const {id} = useParams()
    const [commentObj, setCommentObj] = useState(null);
    useEffect(() => {   
        if (!comment) {
            fetch(`http://localhost:3001/comments/${id}`)
            .then(resp => resp.json())
            .then(comment => setCommentObj(comment))
        }
    }, [comment, id]);

    const finalComment = comment ? comment : commentObj
    if (!finalComment) return <h1>Loading...</h1>
  return (
    <div>
        <h4>Content: {finalComment.content}</h4>
        <h4>Rating: {finalComment.rating}</h4>
    </div>
  )
}

export default CommentCard