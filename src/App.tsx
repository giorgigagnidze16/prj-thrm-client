import React from 'react';
import AuthForm from "./component/auth/authform";
import {Route, Routes} from "react-router-dom";
import Profile from "./component/profile/profile";


const AForm = () => {
    return <div className={"authForm"}>
        <AuthForm/>
    </div>
}

function App() {
    return (
        <>
            <Routes>
                <Route index path={"/"} element={AForm()}/>
                <Route path={"/profile"} element={<Profile/>}/>
            </Routes>
        </>
    );
}

export default App;
