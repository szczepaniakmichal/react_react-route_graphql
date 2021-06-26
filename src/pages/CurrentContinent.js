import React from "react";
import { Link } from "react-router-dom";

export const CurrentContinent = ({continentCode}) => (
    <>
        <p>{continentCode}</p>
        <Link to='/continents/'>Go back to continents list</Link>
    </>
)