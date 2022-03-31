import CommentCard from "./CommentCard"

const CommentsList = ({comments}) => {
    const renderComments = comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)
    return (
        <div>{renderComments}</div>
    )
}

export default CommentsList