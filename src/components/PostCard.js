import {useState, useEffect} from "react"
import {Link, useParams} from "react-router-dom"

const PostCard = ({post}) => {
    const {id} = useParams()
    const [postObj, setPostObj] = useState(null);
    useEffect(() => {   
        if (!post) {
            fetch(`http://localhost:9393/posts/${id}`)
            .then(resp => resp.json())
            .then(post => setPostObj(post))
        }
    }, [post, id]);

    const finalPost = post ? post : postObj
    if (!finalPost) return <h1>Loading...</h1>
  return (
    <div>
        <h3>Title: <Link to={`/posts/${finalPost.id}`}>{finalPost.title}</Link></h3>
        <h4>Content: {finalPost.content.slice(0, 20)}...</h4>
        <img src={finalPost.mediaUrl} alt="Media explanation here" />
        {/* CONDITIONALLY DISPLAY COMMENTS HERE ONLY IF WE ARE IN THE SHOW PAGE */}
    </div>
  )
}

export default PostCard