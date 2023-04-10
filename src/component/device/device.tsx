import React, {useState} from "react";
import {Location, Thermostat} from "../../model/device";
import ThermostatController from "../../api/controller/ThermostatController";
import "./device.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const controller = new ThermostatController();
const DeviceForm = React.memo(
    ({title, setDevices}: { title: string, setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>; }
    ) => {
        const [name, setUsername] = useState<string | null>(null)
        const [location, setLocation] = useState<string>(Location[0])
        const [threshold, setThreshold] = useState<number | null>(null)
        const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            setLocation(Location[Number.parseInt(event.target.value)]);
        };

        const handleSaveDevice = () => {
            if (name && threshold && location) {
                controller.save({name: name, threshold: threshold, location: location})
                    .then(data => data && setDevices(prevState => [...prevState, data!]))
                    .catch(err => alert("error " + err.message))
            }
        }

        return (
            <div className={"parent"}>
                <div className={"wrapper"}>
                    <div style={{height: "80%"}}>
                        <h1 style={{marginBottom: 20}}>{title}</h1>
                        <br/>
                        <label htmlFor={"name"}>
                            Device name:
                        </label>
                        <input type={"text"} id={"name"} value={name || ""}
                               onChange={e => setUsername(e.target.value)}/>
                        <br/>
                        <label htmlFor="thold">
                            Threshold:
                        </label>
                        <input type={"text"} id={"thold"} value={threshold || ""}
                               onChange={e => setThreshold(Number.parseFloat(e.target.value))}/>
                        <br/>
                        <select value={Location.indexOf(location)} onChange={handleChange} className={"dropdown"}>
                            {Location.map((key) => (
                                <option key={key} value={Location.indexOf(key)}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <br/>
                        <button className={"saveButton"} onClick={() => handleSaveDevice()}>
                            Save Device
                        </button>
                    </div>
                </div>
            </div>
        )
    })

export const Device = React.memo(
    ({
         thermostat,
         setDevices
     }: { thermostat: Thermostat, setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>; }
    ) => {
        const handleDelete = () => {
            if (window.confirm("Are you sure you want to delete this item?")) {
                controller.deleteById({id: thermostat.id!})
                    .then(() => setDevices(prevState => prevState.filter(t => t.id !== thermostat.id)))
                    .catch(e => alert(e.message));
            }
        }
        return (
            <div className={"deviceWrapper"}>
                <span className={"edit"}>
                    <EditIcon className={"eicon"}/>
                </span>
                <label htmlFor={"name"}>Thermostat:</label>
                <span id={"name"}>{thermostat.name}</span>
                <br/>
                <label htmlFor={"loc"}>Location:</label>
                <span id={"loc"}>{thermostat.location}</span>
                <br/>

                <label htmlFor={"tmp"}>Temperature:</label>
                <span id={"tmp"}>{thermostat.temperature}°</span>
                <br/>

                <label htmlFor={"thr"}>Threshold:</label>
                <span id={"thr"}>{thermostat.threshold}°</span>
                <br/>

                <label htmlFor={"crit"}>Critical:</label>
                <span id={"thr"}>{thermostat.isCritical ? "YES" : "NO"}</span>

                <span className={"delete"} onClick={handleDelete}>
                    <DeleteIcon className={"dicon"}/>
                </span>
            </div>
        )
    })

export default DeviceForm