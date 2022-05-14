import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"
import { useContext, useState } from "react"
import axios from "axios"

export default function Settings() {
    const { user, dispatch } = useContext(Context)
    const [file, setFile] = useState(null)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")
    const [desc, setDesc] = useState("")
    const [success, setSuccess] = useState(false)
    const PF = "http://localhost:5000/images/"

    const handleUpdate = async (e) => {
        e.preventDefault()
        dispatch({ type: "UPDATE_START" })
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
            desc
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename
            try {
                await axios.post("/upload", data)
            } catch (err) { }
        }
        try {
            const res = await axios.put("/users/" + user._id, updatedUser)
            setSuccess(true)
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" })
        }
    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleUpdate}>
                    <label htmlFor="">Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + (user.profilePic === "" ? "default.webp" : user.profilePic)}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-solid fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput"
                            style={{ display: "none" }}
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={username} onChange={e => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type="email" placeholder={email} onChange={e => setEmail(e.target.value)} />
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    <label>Desc</label>
                    <input type="text" onChange={e => setDesc(e.target.value)} />
                    <button className="settingsSubmit" type="submit">Update</button>
                </form>
                {success && <span style={{ color: "coral", textAlign: "center", marginTop: "10px" }}>Updated Successfully!</span>}
            </div>
            <Sidebar />
        </div>
    )
}
