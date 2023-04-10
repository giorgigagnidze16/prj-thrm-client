import React, {useEffect, useState} from "react";
import {getCurrentUser} from "../../model/utils";
import "./profile.css"
import AddPopup from "../modal";
import {Thermostat} from "../../model/device";
import {Device} from "../device/device";
import ThermostatController from "../../api/controller/ThermostatController";

const Profile = React.memo(() => {
    const [username, setUsername] = useState<string | null>(null)
    const [devices, setDevices] = useState<Thermostat[]>([]);
    useEffect(() => {
        if (getCurrentUser() === null) {
            window.location.replace(process.env.REACT_APP_URL!)
        } else {
            const thermostatController = new ThermostatController();
            const username = localStorage.getItem("username");
            if (username) {
                setUsername(username)
                thermostatController.getUserThermostats()
                    .then(data => setDevices(data || []))
                    .catch(err => alert(err.message))
            }
        }
    }, [])


    return <div className={"parent"}>
        <h1>Welcome {username}!</h1>
        <button className={"goBack"}>← Log Out</button>
        <br/>
        <div className={"child"}>
            {devices.map(e => (
                <Device thermostat={
                    {
                        id: e.id!,
                        name: e.name,
                        threshold: e.threshold,
                        temperature: e.temperature,
                        location: e.location,
                        isCritical: e.isCritical
                    }
                }
                        setDevices={setDevices}
                />))}
            <AddDevice setDevices={setDevices}/>
        </div>
    </div>
})

const AddDevice = React.memo(({setDevices}: { setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>> }) => {
    return <AddPopup setDevices={setDevices}/>;
})

export default Profile;