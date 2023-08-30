import React from "react";

export default function DescriptionArea(props)
{
    const handleDescriptionChange = (event) => {
        props.setCurrentUser((prevCurrentUser) => {
            return ({
                ...prevCurrentUser,
                description: event.target.value
            });
        });
    };

    return (
        <textarea
            id="description"
            value={props.currentUser.description}
            onChange={handleDescriptionChange}
            onClick={(event) => {event.stopPropagation()}}
            rows={5}
            cols={61}
        ></textarea>
    );
}