import "./sidebar.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Context } from "../../context/Context"

export default function Sidebar() {
    const [cats, setCats] = useState([])
    const PF = "http://localhost:5000/images/"
    const { user } = useContext(Context)
    useEffect(() => {
        const fetchCats = async () => {
            const res = await axios.get("/categories")
            setCats(res.data)
        }
        fetchCats()
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">我的头像</span>
                <img
                    className="sidebarImg"
                    src={PF + (user.profilePic === "" ? "default.webp" : user.profilePic)}
                    alt=""
                />
                <p>
                    {user.desc}
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">分类</span>
                <ul className="sidebarList">
                    {cats.map(c => (
                        <Link className="link" to={`/?cat=${c.name} `}>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">关注我们</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-qq"></i>
                    <i className="sidebarIcon fa-brands fa-weixin"></i>
                    <i className="sidebarIcon fa-brands fa-tiktok"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                </div>
            </div>
        </div>
    )
}
