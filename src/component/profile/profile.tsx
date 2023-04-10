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

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        window.location.reload();
    }

    return <div className={"parent"}>
        <h1 className={"title"}>Welcome {username}!</h1>
        <br/>
        <button className={"goBack"} onClick={handleLogout}>
            ← Log Out
        </button>
        <br/>
        <div className={"child"}>
            {devices.map((e, i) => (
                <Device thermostat={
                    {
                        id: e.id!,
                        name: e.name,
                        threshold: e.threshold,
                        temperature: e.temperature,
                        location: e.location,
                        isCritical: e.critical
                    }
                }
                        setDevices={setDevices}
                        key={i * 100}
                />))}
            <AddDevice setDevices={setDevices} devices={devices}/>
        </div>
    </div>
})

const AddDevice = React.memo(
    ({
         setDevices,
         devices
     }:
         {
             setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>,
             devices: Thermostat[]
         }
    ) => {
        return <AddPopup setDevices={setDevices} devices={devices}/>;
    })

export default Profile;