import PostCard from "./PostCard"

const PostsList = ({posts}) => {
    const renderPosts = posts.map(post => <PostCard key={post.id} post={post}/>)
    return (
        <div>{renderPosts}</div>
    )
}

export default PostsList