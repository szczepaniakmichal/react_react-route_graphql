import React from "react";
import { Link } from "react-router-dom";

export const CurrentContinent = ({continentCode}) => (
    <>
        <p className="p-2 text-center bg-yellow-200">Continent code: {continentCode}</p>
        <Link to='/continents/'
              className="block mb-5 p-2 text-center bg-yellow-300 hover:bg-yellow-400 transition duration-300"
        >Go back to continents list</Link>
    </>
)