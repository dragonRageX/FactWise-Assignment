import React from "react";

export default function GenderDropdown(props)
{
    const handleGenderChange = (event) => {
        props.setCurrentUser((prevCurrentUser) => {
            return ({
                ...prevCurrentUser,
                gender: event.target.value
            });
        });
    };

    return (
        <select id="gender-dropdown" value={props.currentUser.gender} onChange={handleGenderChange} onClick={(event) => {event.stopPropagation()}}>
            {/* <option value="">Select</option> */}
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="transgender">Transgender</option>
            <option value="ratherNotSay">Rather Not Say</option>
            <option value="other">Other</option>
        </select>
    );
}