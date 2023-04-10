import React, {FC} from "react";
import Popup from "reactjs-popup";
// @ts-ignore
import logo from "./profile/plus-svgrepo-com.svg";
import DeviceForm from "./device/device";
import "./device/device.css"
import {Thermostat} from "../model/device";

interface PopupContentProps {
    close: () => void;
}

const PopupContent: FC<PopupContentProps &
    {
        setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>,
        devices: Thermostat[]
    }>
    = ({
           close,
           setDevices,
           devices
       }) => {
    return (
        <div className={"behind"}>
            <DeviceForm title={"Add a device"} setDevices={setDevices} devices={devices}/>
            <button onClick={close} className={"goBack"}>Close Popup</button>
        </div>
    );
};

const AddPopup: React.FC<{
    setDevices: React.Dispatch<React.SetStateAction<Thermostat[]>>,
    devices: Thermostat[]
}> = ({
          setDevices,
          devices
      }) => {
    const popupProps: any = {
        trigger: <button className={"addDevice"}
                         style={{cursor: "pointer", border: "none", backgroundColor: "transparent"}}>
            <img src={logo} alt={"log"} className={"add"}/>
        </button>,
        modal: true,
    };

    return (
        <div style={{width: 120, display: "inline-block"}}>
            <Popup {...popupProps}>
                {(close: () => void) => <PopupContent close={close} setDevices={setDevices} devices={devices}/>}
            </Popup>
        </div>
    );
};


export default AddPopup;
