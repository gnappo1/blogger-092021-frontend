import {useState} from "react"

const EditPostForm = ({postObj, handleUpdate, handleError}) => {
    const [post, setPost] = useState({
        title: postObj.title,
        content: postObj.content,
        mediaUrl: postObj.mediaUrl || "",
        deleteTime: postObj.delete_time || ""
    });

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([post.title, post.content, post.deleteTime].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

       fetch(`http://localhost:3001/posts/${postObj.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify({title: post.title, content: post.content, media_url: post.mediaUrl, delete_time: post.deleteTime})
       })
       .then((resp) => {
            if (resp.status === 201) {
                resp.json()
                .then(data => handleUpdate(data))
            } else {
                resp.json()
                .then(errorObj => handleError(errorObj.error))
            }
        })
        .catch(err => handleError(err.message))
       
        
    }
    return (
        <>
            <h3>Edit Post</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" name="title" value={post.title} required/><br />
                <label htmlFor="content">Content</label>
                <input onChange={handleChange} type="text" name="content" value={post.content} required/><br />
                <label htmlFor="mediaUrl">Media Url</label>
                <input onChange={handleChange} type="text" name="mediaUrl" value={post.mediaUrl}/><br />
                <label htmlFor="deleteTime">Delete DateTime</label>
                <input onChange={handleChange} type="datetime-local" name="deleteTime" value={post.deleteTime.toString().substring(0, 16)} required/><br />
                <input type="submit" value="Update Post" />
            </form>
        </>
    )
}

export default EditPostForm