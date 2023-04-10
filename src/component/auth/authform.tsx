import React, {useEffect, useState} from "react"
import "./auth.css"
import {Button} from "@mui/material"
import UserController from "../../api/controller/UserController"
import {getCurrentUser, handleLoginRedirect, handleLoginSuccess} from "../../model/utils"

const AuthForm = React.memo(() => {
    const [loginForm, setLoginForm] = useState(false)
    return (
        <div className={"formWrapper"}>
            {
                loginForm ? <Form setLoginForm={setLoginForm} title={"Register"}/>
                    : <Form setLoginForm={setLoginForm} title={"Log In"}/>
            }
        </div>)
})


const Form = React.memo(
    ({setLoginForm, title}: { setLoginForm: (value: boolean) => void, title: string }
    ) => {
        const [username, setUsername] = useState<string | null>(null)
        const [password, setPassword] = useState<string | null>(null)
        const [cpassword, setCPassword] = useState<string | null>(null)
        const controller = new UserController()

        const isRegistration = title === "Register"
        const mainInput = username && password
        const registerConfirm = mainInput && cpassword && cpassword === password && username.length > 0 && password.length > 0


        useEffect(() => {
            if (getCurrentUser()) {
                handleLoginRedirect()
            }
        }, [])

        const handleRegistration = () => {
            setLoginForm(true)
            if (isRegistration && registerConfirm) {
                controller.register({username: username, password: password}).then(data => {
                    if (data) {
                        handleLoginSuccess(data, username)
                    }
                })
            }
            setPassword(null)
            setUsername(null)
            setCPassword(null)
        }

        const handleLogin = () => {
            if (mainInput && username.length > 0 && password.length > 0) {
                controller.login({username: username, password: password}).then(data => {
                    if (data) {
                        handleLoginSuccess(data, username)
                    }
                })
            }
            setPassword(null)
            setUsername(null)
            setCPassword(null)
        }

        return (
            <div className={"wrapper"}>
                <div style={{height: "80%"}}>
                    <h1>{title}</h1>
                    <br/>
                    <label htmlFor={"name"}>
                        Username:
                    </label>
                    <input type={"text"} className={"name"} id={"name"} minLength={3} value={username || ""}
                           onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <label htmlFor="pw">Password:</label>
                    <input type={"password"} className={"pw"} id={"pw"} value={password || ""}
                           onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    {!isRegistration ? (
                        <React.Fragment>
                            <Button style={{display: "block", width: 200, margin: "0 auto"}} variant={"contained"}
                                    color={"success"}
                                    onClick={() => handleLogin()}>
                                Log in
                            </Button>
                            <br/>
                        </React.Fragment>
                    ) : (<React.Fragment>
                        <label htmlFor="cpw">Confirm Password:</label>
                        <input type={"password"} className={"pw"} id={"cpw"} value={cpassword || ""}
                               onChange={e => setCPassword(e.target.value)}/>
                        <br/>
                    </React.Fragment>)}
                    <button className={"register"} onClick={() => handleRegistration()}>
                        Register
                    </button>
                    {isRegistration && <button className={"goBack"} onClick={() => setLoginForm(false)}>← Back</button>}
                </div>
            </div>
        )
    })

export default AuthForm