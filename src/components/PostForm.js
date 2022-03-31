import {useState} from "react"
import {useHistory} from "react-router-dom"

const PostForm = () => {
    const [post, setPost] = useState({
        title: "",
        content: "",
        mediaUrl: "",
    });
    const history = useHistory()

    const handleChange = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if ([post.title, post.content, post.mediaUrl].some(val => val.trim() === "")) {
            alert("You must fill in all the information please!")
        }

        const newPost = {
            title: post.title,
            content: post.content,
            media_url: post.mediaUrl,
        }
        
    }
    return (
        <>
            <h3>Create a new post</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} type="text" name="title" value={post.title} required/><br />
                <label htmlFor="content">Content</label>
                <input onChange={handleChange} type="text" name="content" value={post.content} required/><br />
                <label htmlFor="mediaUrl">Media Url</label>
                <input onChange={handleChange} type="text" name="mediaUrl" value={post.mediaUrl} required/><br />
                <input type="submit" value="Create Post" />
            </form>
        </>
    )
}

export default PostForm