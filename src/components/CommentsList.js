import CommentCard from "./CommentCard"
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"

const CommentsList = ({comments, handleError}) => {
    const {postId} = useParams()
    const [commentsList, setCommentsList] = useState(null)
    
    useEffect(() => {
        if (!comments) {
            fetch(`http://localhost:3001/posts/${postId}/comments`)
            .then(resp => {
                if (resp.status === 200) {
                    resp.json()
                    .then(comments => setCommentsList(comments))
                } else {
                    resp.json()
                    .then(errorObj => handleError(errorObj.error))
                }
            })
            .catch(error => handleError(error))
        }
    }, [postId, comments, handleError])

    // if (!comments) return <h2>The data you tried to access does not exist!</h2>
    const finalCommentsList = comments ? comments : commentsList
    const renderComments = finalCommentsList?.map(comment => <CommentCard key={comment.id} comment={comment}/>)
    return (
        <div>{renderComments}</div>
    )
}

export default CommentsList