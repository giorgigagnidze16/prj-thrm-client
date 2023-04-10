import React, {useState} from "react";
import {Location, Thermostat} from "../../model/device";
import ThermostatController from "../../api/controller/ThermostatController";
import "./device.css"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const controller = new ThermostatController();
const DeviceForm = React.memo(
    ({
         title,
         setDevices,
         devices
     }: { title: string, devices: Thermostat[], setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>; }
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
                    .then(data => {
                        if (data) {
                            controller.findById({id: data.id!})
                                .then(d => {
                                    if (d) {
                                        if (devices.length > 0) {
                                            setDevices(prevState => [...prevState, d])
                                        } else {
                                            setDevices([d])
                                        }
                                    }
                                })
                                .catch(err => alert("error " + err.message))
                        }
                    })
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
                        <input type={"number"} id={"thold"} value={threshold || ""}
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
        const [isEditing, setIsEditing] = useState(false);
        const [editedThermostat, setEditedThermostat] = useState(thermostat);
        const handleDelete = () => {
            if (window.confirm("Are you sure you want to delete this item?")) {
                controller.deleteById({id: thermostat.id!})
                    .then(() => setDevices(prevState => prevState.filter(t => t.id !== thermostat.id)))
                    .catch(e => alert(e.message));
            }
        }

        const handleEditClick = () => {
            setIsEditing(true);
            setEditedThermostat(thermostat);
        };
        console.log("Gamarjoba ", thermostat)

        const handleSaveClick = () => {
            const updated: Thermostat = {
                ...thermostat,
                name: editedThermostat.name,
                threshold: editedThermostat.threshold,
                location: editedThermostat.location,
                isCritical: editedThermostat.temperature! >= editedThermostat.threshold
            };
            if (JSON.stringify(updated) !== JSON.stringify(thermostat))
                controller.updateThermostat(updated)
                    .then(r => setDevices(prevState => prevState.map(e => {
                        if (e.id === thermostat.id) {
                            return {...updated};
                        }
                        return e;
                    })))
                    .catch(e => alert(e.message));
            setIsEditing(false);
        };

        return (
            <div className={"deviceWrapper"}>
                {thermostat.temperature! >= thermostat.threshold &&
                    <span className={"warning"}>
                        <PriorityHighIcon style={{fill: "red"}} fontSize={"large"}/>
                    </span>
                }
                {isEditing ? (
                    <div className="popup">
                        <label htmlFor={"name"}>Thermostat:</label>
                        <input
                            id={"name"}
                            value={editedThermostat.name}
                            onChange={(e) =>
                                setEditedThermostat({
                                    ...editedThermostat,
                                    name: e.target.value,
                                })
                            }
                        />
                        <br/>
                        <label htmlFor={"loc"} style={{marginRight: 10}}>Location:</label>
                        <select value={Location.indexOf(editedThermostat.location)}
                                onChange={(e) =>
                                    setEditedThermostat({
                                        ...editedThermostat,
                                        location: Location[Number.parseInt(e.target.value)],
                                    })
                                }
                                className={"dropdown"} id={"loc"}>
                            {Location.map((key) => (
                                <option key={key} value={Location.indexOf(key)}>
                                    {key}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <label htmlFor={"thr"}>Threshold:</label>
                        <input
                            id={"thr"}
                            type={"number"}
                            value={editedThermostat.threshold}
                            onChange={(e) =>
                                setEditedThermostat({
                                    ...editedThermostat,
                                    threshold: parseFloat(e.target.value),
                                    isCritical: editedThermostat.temperature! >= parseFloat(e.target.value)
                                })
                            }
                        />
                        <br/>
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                ) : null}
                <span className={"edit"} onClick={handleEditClick}>
          <EditIcon className={"eicon"} fontSize={"large"}/>
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
                <span id={"thr"}>{thermostat.isCritical ? "Yes" : "No"}</span>
                <span className={"delete"} onClick={handleDelete}>
                    <DeleteIcon className={"dicon"} fontSize={"large"}/>
                </span>
            </div>
        )
    })

export default DeviceForm