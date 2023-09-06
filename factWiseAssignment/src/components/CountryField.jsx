import React from "react";

export default function CountryField(props)
{
    const handleCountryChange = (event) => {
        props.setCurrentUser((prevCurrentUser) => {
            return ({
                ...prevCurrentUser,
                country: event.target.value
            });
        });
    };

    return (
        <input
            type="text"
            id="country"
            value={props.currentUser.country}
            onChange={handleCountryChange}
            onClick={(event) => {event.stopPropagation()}}
        />
    );
}