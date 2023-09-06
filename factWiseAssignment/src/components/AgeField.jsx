import React from "react";

export default function AgeField(props)
{
    const [age, setAge] = React.useState(props.age);

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            onClick={(event) => {event.stopPropagation()}}
        />
    );
}