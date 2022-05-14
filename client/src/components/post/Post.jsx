import "./post.css"
import { Link } from "react-router-dom"

export default function Post({ post }) {
    const PF = "http://localhost:5000/images/"
    return (
        <div className="post">
            {
                post.photo && (
                    <img
                        className="postImg"
                        // src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201907%2F05%2F20190705220904_tdwth.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654596960&t=85d8e15c4617023f8e5d0b2b1a4808c9"
                        src={PF + post.photo}
                        alt=""
                    />)
            }
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map(c => (

                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
                <p className="postDesc">
                    {post.desc}
                </p>
            </div>
        </div>
    )
}
