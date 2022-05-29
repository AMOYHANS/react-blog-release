import "./register.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            const res = await axios.post("/auth/register", {
                username,
                email,
                password
            })
            res.data && window.location.replace("/login")
        } catch (err) {
            setError(true)
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>用户名</label>
                <input
                    onChange={e => setUsername(e.target.value)}
                    className="registerInput" type="text" placeholder="用户名..." />
                <label>邮箱</label>
                <input
                    onChange={e => setEmail(e.target.value)}
                    className="registerInput" type="text" placeholder="邮箱..." />
                <label>密码</label>
                <input
                    onChange={e => setPassword(e.target.value)}
                    className="registerInput" type="password" placeholder="密码..." />
                <button className="registerButton" type="submit">成为居民</button>
            </form>
            <button className="registerLoginButton">
                <Link to="/login" className="link">进入小屋</Link>
            </button>
            {error && <span style={{ color: "red", marginTop: "10px" }}>出错了哦~!</span>}
        </div>
    )
}
