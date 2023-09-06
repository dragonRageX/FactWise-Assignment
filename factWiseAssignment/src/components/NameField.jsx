import React from "react";

export default function NameField(props)
{
    const [name, setName] = React.useState(`${props.currentUser.first} ${props.currentUser.last}`);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    React.useEffect(() => {
        let editedName = name.split(" ", 2);
        props.setCurrentUser((prevCurrentUser) => {
            return ({
                ...prevCurrentUser,
                first: editedName[0],
                last: editedName[1]
            });
        });
    }, [name]);

    return (
        <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            onClick={(event) => {event.stopPropagation()}}
        />
    );
}