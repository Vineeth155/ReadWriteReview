import { useState } from "react"
import { Form } from "../components/form"
import axios from 'axios'

export const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onsubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${process.env.REACT_APP_URL}auth/register`,{username, password})
            alert("Registration Successful!\n You Can Login Now")
        } catch(err){
            alert(`Failed to Register!\nReason: ${err}`)
        }
    }

    return (
        <div className="login">
            <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Register" onSubmit={onsubmit} />
        </div>
    )
}
