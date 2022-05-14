import "./singlePost.css"
import { useLocation } from "react-router"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

export default function SinglePost() {
    const PF = "http://localhost:5000/images/"
    const location = useLocation()
    const [post, setPost] = useState({})
    const postId = location.pathname.split("/")[2]
    const { user } = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/posts/${post._id}`, {
                title,
                desc,
                username: user.username
            })
            // window.location.reload()
            setUpdateMode(false)
        } catch (err) {

        }
    }

    const handleDelete = async (e) => {
        try {
            await axios.delete("/posts/" + postId, { data: { username: user.username } })
            window.location.replace("/")
        } catch (err) {

        }
    }

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + postId)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [postId])


    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img src={PF + post.photo} alt="" className="singlePostImg" />)}
                {updateMode ?
                    <input type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="singlePostTitleInput"
                        autoFocus
                    /> :
                    <h1 className="singlePostTitle">{title}
                        {post.username === user.username &&
                            <div className="singlePostEdit">
                                <i class="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                <i class="singlePostIcon fa-solid fa-file-pen" onClick={() => setUpdateMode(true)}></i>
                            </div>
                        }
                    </h1>
                }
                <div className="singlePostInfo">
                    <span className="singlePostAu">
                        Author:
                        <Link className="link" to={`/?user=${post.username}`}>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ?
                    <textarea
                        className="singlePostDescInput"
                        value={desc}
                        onChange={e => setDesc(e.target.value)} />
                    :
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                }
                {updateMode &&
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                }
            </div>
        </div>
    )
}
