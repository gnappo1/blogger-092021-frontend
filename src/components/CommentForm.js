import {useState} from "react"
import {useHistory} from "react-router-dom"

const CommentForm = ({postId, addNewComment}) => {
    const [comment, setComment] = useState({
        content: "",
        rating: "",
    });

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
            rating: comment.rating,
            content: comment.content
        }

        fetch(`http://localhost:3001/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
        .then(resp => {
            if (resp.status === 201) {
                resp.json()
                .then(comment => {
                    addNewComment(comment)
                    setComment({content: "", rating: ""})

                })
            } else {
                resp.json()
                .then(errorObj => {
                    alert(errorObj.error)
                    setComment({content: "", rating: ""})
                })
            }
        })
        .catch(err => alert(err))
        
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