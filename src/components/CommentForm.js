import {useState} from "react"
import {useHistory} from "react-router-dom"

const CommentForm = () => {
    const [comment, setComment] = useState({
        content: "",
        rating: "",
    });
    const history = useHistory()

    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([comment.rating, comment.content].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

        const newComment = {
            title: comment.title,
            content: comment.content,
            // what are we missing here? 
        }
        
    }
    return (
        <>
            <h3>Create a new comment</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="content">Content</label>
                <input onChange={handleChange} type="text" name="content" value={comment.content} required/><br />
                <label htmlFor="rating">Rating</label>
                <input onChange={handleChange} type="number" name="rating" value={comment.rating} required/><br />
                <input type="submit" value="Create Comment" />
            </form>
        </>
    )
}

export default CommentForm