import "./login.css"
import { Link } from "react-router-dom"
import axios from "axios"
import { useContext, useRef } from "react"
import { Context } from "../../context/Context"

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const { dispatch, isFetching } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }

    return (
        <div className="login">
            <span className="loginTitle">登录</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>用户名</label>
                <input ref={userRef} className="loginInput" type="text" placeholder="用户名..." />
                <label>密码</label>
                <input ref={passwordRef} className="loginInput" type="password" placeholder="密码..." />
                <button className="loginButton" type="submit" disabled={isFetching} >
                    进入小屋
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link to="/register" className="link">成为居民</Link>
            </button>
        </div>
    )
}
