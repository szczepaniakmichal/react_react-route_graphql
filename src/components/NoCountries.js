import React from "react";
import { Link } from "react-router-dom";

export const NoCountries = ({continentCode}) => {
    return (
        <p>There are no countries with the specified continent code <span>"{continentCode}"</span>.
            You can <Link to="/continents/"
                            className="text-yellow-400"
            >go back to continents list</Link>.
        </p>
    )
}