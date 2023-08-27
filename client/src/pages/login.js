import { useState } from "react"
import { Form } from "../components/form"
import axios from "axios"
import {useCookies} from "react-cookie"
import {useNavigate} from 'react-router-dom'

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [_, setCookies] = useCookies(["access_token"])
    const navigate = useNavigate()

    const onSubmit = async(e) => {
        e.preventDefault();
        if(!username) return alert("Please Enter Valid Username!")
        if(!password) return alert("Please Enter Valid Username!")
        try{
            const response = await axios.post(`${process.env.REACT_APP_URL}auth/login`,{username, password})
            if(response.data.token){
            setCookies('access_token',response.data.token);
            window.localStorage.setItem("userID",response.data.userID)
            navigate("/")
            // alert("Login Successful!")
            }
            else{
                alert(response.data.message)
            }
        } catch(err){
            alert(`Failed to Login!\n Possible Reason: ${err}`)
        }
    }

    return (
        <div className="login">
            <Form username={username} setUsername={setUsername} password={password} setPassword={setPassword} label="Login" onSubmit={onSubmit}/>
        </div>
    )
}
